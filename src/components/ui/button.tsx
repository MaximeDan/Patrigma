"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/tailwindUtils";

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
  isSignOut?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isSignOut = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={
          isSignOut
            ? async (e) => {
                e.preventDefault();
                await signOut();
              }
            : props.onClick
        }
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
