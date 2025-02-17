import React, { forwardRef } from 'react';
import { type ChildrenProps } from '@/types/global';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      'display/title-1': 'text-4xl font-normal leading-[34px] tracking-tight',
      'display/title-2': 'text-3xl font-normal leading-7',
      'display/title-3': 'text-2xl font-normal leading-[25px] tracking-tight',
      'display/headline-semi': 'text-[17px] font-semibold leading-[22px]',
      'display/body': 'text-base font-medium leading-[24px] tracking-tight',
      'display/body-semi':
        'text-base font-semibold leading-normal tracking-tight',
      'display/subhead':
        'text-[15px] font-normal leading-tight tracking-[-0.23px]',
      'display/footnote': 'text-sm font-normal leading-[18px]',
      'display/caption': 'text-xs font-normal leading-none',
      'display/subtle':
        'text-base font-normal leading-tight text-muted-foreground'
    },
    tightness: {
      tight: 'leading-snug',
      supertight: 'leading-none'
    }
  },
  defaultVariants: { variant: 'display/body', tightness: undefined }
});

export interface TypographyProps
  extends Partial<ChildrenProps>,
    VariantProps<typeof typographyVariants> {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = ({
  children,
  variant,
  tightness,
  className,
  as: Component = 'p'
}: TypographyProps) => {
  return (
    <Component
      className={cn(typographyVariants({ variant, tightness }), className)}
    >
      {children}
    </Component>
  );
};

export const T = Typography;

/**
 * Typography specifically with the Paragraph element, to allow to forward refs.
 *
 * This is just created for the Paragraph element as it's the most used for
 * Typography and UI elements like forms, dialogs, etc. all expect to forward a
 * Ref.
 *
 * Ref forwarding only works with a specific element, therefore not handleable
 * in Typography easily. Maybe it can be added in the future by someone more
 * experienced with it.
 *
 * This should only be used in shadcn-ui elements, not in general code!
 */
export const PTypography = forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'as'>
>(({ children, variant, tightness, className }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(typographyVariants({ variant, tightness }), className)}
    >
      {children}
    </p>
  );
});
PTypography.displayName = 'PTypography';

export const H3Typography = forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'as'>
>(({ children, variant, tightness, className }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(typographyVariants({ variant, tightness }), className)}
    >
      {children}
    </h3>
  );
});
H3Typography.displayName = 'H3Typography';
