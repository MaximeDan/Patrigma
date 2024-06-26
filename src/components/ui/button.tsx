"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { signOut } from "next-auth/react";
import { useEventFormStore } from "@/store/eventFormStore";
import { cn } from "@/lib/tailwindUtils";
import { buttonAction } from "@/types/enums/button";
import { BadRequestException } from "@/types/exceptions";
import { handleException } from "@/utils/errorHandlerUtils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium uppercase  disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-full border border-beige text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        danger: "rounded-lg border border-red-600 !py-3 text-red-600",
        dangerFilled: "rounded-lg bg-red-600 !py-3 text-white",
        outline: "",
        ghost: "",
      },
      size: {
        default: "px-[9px] py-[5px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  action?: buttonAction;
  ressourceId?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      action,
      ressourceId,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const { setJourneyIdValue, showModal } = useEventFormStore();
    const handleAction = async () => {
      try {
        switch (action) {
          case buttonAction.SIGN_OUT:
            await signOut();
            break;
          case buttonAction.SET_JOURNEY_ID:
            if (!ressourceId) throw new BadRequestException("id is required");
            setJourneyIdValue(ressourceId);
            showModal();
            break;
          default:
            break;
        }
      } catch (error) {
        handleException(error);
      }
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={
          action
            ? async (e) => {
                e.preventDefault();
                await handleAction();
              }
            : props.onClick
        }
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
