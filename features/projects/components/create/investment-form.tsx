"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  CreateFormProps,
  PropertyDetailsRequestDto,
  PropertyInvestmentRequestDto,
  propertyInvestmentSchema,
} from "@/features/projects/types/app";
import { propertyDetailsSchema } from "@/features/projects/types/app";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";

export const InvestmentForm = ({
  disablePreviousStep,
  showNextStep,
  backAction,
  onCompleteAction,
}: CreateFormProps) => {
  const form = useForm<PropertyInvestmentRequestDto>({
    resolver: zodResolver(propertyInvestmentSchema),
  });

  const saveInvestmentDetails = async (data: PropertyInvestmentRequestDto) => {
    console.log(data);
    onCompleteAction(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4"
        onSubmit={form.handleSubmit(saveInvestmentDetails)}
      >
        <h2 className="text-center font-bold">INVESTMENT INFORMATION</h2>
        <FormField
          control={form.control}
          name="slots"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="slots">Slots</Label>
              <FormControl>
                <Input type="number" placeholder="Number of slots" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slotPrice"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="slot-price">Slot Price (Naira)</Label>
              <FormControl>
                <Input type="number" placeholder="Slot price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="duration">Duration (Months)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of months"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roi"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="roi">Return on Investments (PERCENTAGE)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter percentage of profits"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker
                  {...field}
                  iconless
                  onChange={(date) => {
                    // Handles it as a UTC date, otherwise the date will be
                    // off by 1 day.
                    field.onChange(
                      new Date(
                        Date.UTC(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                        ),
                      ),
                    );
                  }}
                  onDateError={(error) => {
                    if (error) {
                      form.setError("startDate", {
                        message: error,
                        type: "onChange",
                      });
                    } else {
                      form.clearErrors("startDate");
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={backAction}
            disabled={disablePreviousStep}
          >
            Previous
          </Button>
          {showNextStep ? (
            <Button type="submit">Next</Button>
          ) : (
            <Button type="submit">Preview</Button>
          )}
        </div>
      </form>
    </Form>
  );
};
