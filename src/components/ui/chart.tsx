import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import type {
  TooltipProps,
  LegendPayload,
} from "recharts";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) {
    throw new Error("useChart must be used within ChartContainer");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                              Chart Container                               */
/* -------------------------------------------------------------------------- */

type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof ResponsiveContainer>["children"];
};

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ className, config, children, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line]:stroke-border/50",
          className
        )}
        {...props}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "ChartContainer";

/* -------------------------------------------------------------------------- */
/*                                Tooltip                                     */
/* -------------------------------------------------------------------------- */

type ChartTooltipContentProps = {
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "dot" | "line";
};

type TooltipInjectedProps = TooltipProps<number, string> & {
  payload?: {
    dataKey?: string | number;
    name?: string;
    value?: number;
    color?: string;
  }[];
  label?: string | number;
};

export function ChartTooltipContent(
  props: ChartTooltipContentProps & TooltipInjectedProps
) {
  const {
    active,
    payload,
    label,
    className,
    hideLabel,
    hideIndicator,
    indicator = "dot",
  } = props;

  const { config } = useChart();

  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background px-3 py-2 shadow-md",
        className
      )}
    >
      {!hideLabel && (
        <div className="mb-1 font-medium">
          {config[String(label)]?.label ?? label}
        </div>
      )}

      <div className="space-y-1">
        {payload.map((item, index) => {
          const key = String(item.dataKey ?? index);
          const color = item.color ?? "currentColor";

          return (
            <div key={index} className="flex items-center gap-2">
              {!hideIndicator && (
                <span
                  className={cn(
                    "inline-block",
                    indicator === "dot" && "h-2 w-2 rounded-full",
                    indicator === "line" && "h-2 w-0.5"
                  )}
                  style={{ backgroundColor: color }}
                />
              )}
              <span className="text-muted-foreground">
                {config[key]?.label ?? item.name}
              </span>
              {item.value != null && (
                <span className="ml-auto font-mono">
                  {item.value.toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Legend                                     */
/* -------------------------------------------------------------------------- */

type ChartLegendContentProps = {
  className?: string;
  hideIcon?: boolean;
  payload?: LegendPayload[];
};

export function ChartLegendContent({
  className,
  payload,
  hideIcon,
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload || payload.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {payload.map((item, index) => {
        const key = String(item.dataKey ?? index);

        return (
          <div key={index} className="flex items-center gap-2">
            {!hideIcon && (
              <span
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="text-sm">
              {config[key]?.label ?? item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
};
