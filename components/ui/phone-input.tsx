"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { useFormContext } from "react-hook-form";

import "react-phone-number-input/style.css";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export function PhoneNumberInput({
  name,
  label,
  className,
  ...props
}: PhoneInputProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          {label && <Label>{label}</Label>}
          <FormControl>
            <PhoneInput
              {...props}
              {...field}
              value={value}
              onChange={onChange}
              international
              defaultCountry="NG"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
