import * as React from "react";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";

const SIDEBAR_SHORTCUT_KEY = "b";

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (value: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (value: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                              Sidebar Provider                               */
/* -------------------------------------------------------------------------- */

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: controlledOpen,
      onOpenChange,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [uncontrolledOpen, setUncontrolledOpen] =
      React.useState(defaultOpen);

    const open = controlledOpen ?? uncontrolledOpen;

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (onOpenChange) {
          onOpenChange(value);
        } else {
          setUncontrolledOpen(value);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [onOpenChange, setUncontrolledOpen]
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((v) => !v);
      } else {
        setOpen(!open);
      }
    }, [isMobile, open, setOpen]);

    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (
          e.key === SIDEBAR_SHORTCUT_KEY &&
          (e.ctrlKey || e.metaKey)
        ) {
          e.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [toggleSidebar]);

    const value = React.useMemo<SidebarContextValue>(
      () => ({
        state: open ? "expanded" : "collapsed",
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }),
      [open, setOpen, openMobile, isMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={value}>
        <TooltipProvider delayDuration={0}>
          <div
            ref={ref}
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full",
              className
            )}
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

/* -------------------------------------------------------------------------- */
/*                                   Sidebar                                  */
/* -------------------------------------------------------------------------- */

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    collapsible?: "offcanvas" | "none";
  }
>(
  (
    {
      side = "left",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            side={side}
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              { "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
            }
          >
            <div className="flex h-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        data-state={state}
        data-side={side}
        className="group peer hidden md:block"
      >
        <div
          className={cn(
            "fixed inset-y-0 z-10 flex w-[--sidebar-width] transition-all",
            side === "left" ? "left-0" : "right-0",
            state === "collapsed" &&
              (side === "left"
                ? "-translate-x-full"
                : "translate-x-full"),
            className
          )}
          {...props}
        >
          <div className="flex h-full w-full flex-col bg-sidebar">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                  */
/* -------------------------------------------------------------------------- */

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
      className
    )}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("p-2", className)} {...props} />
);

const SidebarFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("p-2", className)} {...props} />
);

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
};
