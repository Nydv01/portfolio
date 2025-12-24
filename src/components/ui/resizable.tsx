import * as React from "react";
import { GripVertical } from "lucide-react";
import * as Panels from "react-resizable-panels";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                               Internal Types                                */
/* -------------------------------------------------------------------------- */

/**
 * Older versions do NOT export PanelGroup / PanelResizeHandle.
 * They exist at runtime but are missing from typings.
 */
const PanelGroup = (Panels as unknown as {
  PanelGroup: React.ComponentType<any>;
}).PanelGroup;

const PanelResizeHandle = (Panels as unknown as {
  PanelResizeHandle: React.ComponentType<any>;
}).PanelResizeHandle;

const Panel = Panels.Panel;

/* -------------------------------------------------------------------------- */
/*                               Panel Group                                  */
/* -------------------------------------------------------------------------- */

const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    direction?: "horizontal" | "vertical";
  }
>(({ className, ...props }, ref) => {
  return (
    <PanelGroup
      ref={ref}
      className={cn(
        "flex h-full w-full",
        "data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
});

ResizablePanelGroup.displayName = "ResizablePanelGroup";

/* -------------------------------------------------------------------------- */
/*                                  Panel                                     */
/* -------------------------------------------------------------------------- */

const ResizablePanel = Panel;

/* -------------------------------------------------------------------------- */
/*                                  Handle                                    */
/* -------------------------------------------------------------------------- */

type ResizableHandleProps = React.ComponentProps<"div"> & {
  withHandle?: boolean;
};

const ResizableHandle = ({
  withHandle = false,
  className,
  ...props
}: ResizableHandleProps) => {
  return (
    <PanelResizeHandle
      className={cn(
        "relative flex items-center justify-center bg-border",
        "w-px data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "data-[panel-group-direction=vertical]:after:left-0",
        "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:h-1",
        "data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-background">
          <GripVertical className="h-2.5 w-2.5 text-muted-foreground" />
        </div>
      )}
    </PanelResizeHandle>
  );
};

ResizableHandle.displayName = "ResizableHandle";

/* -------------------------------------------------------------------------- */

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
};
