import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/general/loading-spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        constructive:
          "bg-constructive text-constructive-foreground shadow-sm hover:bg-constructive/90",
        outline:
          "border border-border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 gap-1.5",
        sm: "h-8 px-3 text-xs gap-1",
        lg: "h-10 px-8 gap-2",
        icon: "h-9 w-9",
        standard: "h-12 rounded-md py-2 px-4 gap-1.5",
      },
      // Adds a neat hover & click animation. Shouldn't be used too often.
      emphasis: {
        true: "transition-transform hover:scale-105 active:scale-95 motion-safe:transform-gpu motion-safe:duration-200",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      emphasis: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export type ValidNestedProperties =
  | "isLoading"
  | "leftIcon"
  | "rightIcon"
  | "children"
  | "emphasis";

export type ButtonContentProps = Pick<ButtonProps, ValidNestedProperties>;

/**
 * Content component for buttons, including icons and loading spinners.
 * Intended for elements that need button-like styling but are not buttons.
 */

const ButtonContent = (props: ButtonContentProps) => {
  const { isLoading, leftIcon, rightIcon } = props;

  return (
    <>
      {leftIcon && <span className="select-none">{leftIcon}</span>}
      {isLoading && <LoadingSpinner size="xs" />}
      <span className="select-none">{props.children}</span>
      {rightIcon && <span className="select-none">{rightIcon}</span>}
    </>
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      emphasis,
      isLoading,
      disabled,
      leftIcon,
      rightIcon,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, emphasis, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        <ButtonContent
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          isLoading={isLoading}
        >
          {props.children}
        </ButtonContent>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, ButtonContent };
