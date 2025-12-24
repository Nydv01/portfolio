import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => {
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
});
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  );
});
InputOTPGroup.displayName = "InputOTPGroup";

type InputOTPSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  index: number;
};

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const context = React.useContext(OTPInputContext);

    if (!context) {
      throw new Error("InputOTPSlot must be used within <InputOTP>");
    }

    const { char, hasFakeCaret, isActive } = context.slots[index];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all",
          "first:rounded-l-md first:border-l last:rounded-r-md",
          isActive && "z-10 ring-2 ring-ring ring-offset-background",
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-px animate-caret-blink bg-foreground" />
          </span>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  );
});
InputOTPSeparator.displayName = "InputOTPSeparator";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
};
