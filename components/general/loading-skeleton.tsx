import { type VariantProps, cva } from "class-variance-authority";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const skeletonVariants = cva("", {
  variants: {
    size: {
      "table-row": "h-8",
      sm: "h-16",
      default: "h-20",
      lg: "h-24",
      full: "h-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  rows?: number;
  cols?: number;
}

export const LoadingSkeleton = ({
  rows = 3,
  cols = 3,
  className,
  size,
  ...props
}: LoadingSkeletonProps) => {
  const numSkeletons = rows * cols;

  return (
    <div className={cn(`grid gap-2 grid-cols-${cols}`, className)} {...props}>
      {Array.from({ length: numSkeletons }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("col-span-1", skeletonVariants({ size }))}
        />
      ))}
    </div>
  );
};
