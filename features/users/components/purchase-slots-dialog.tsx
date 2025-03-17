'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatCurrency } from '@/lib/utils';
import {
  PurchaseFormRequest,
  purchaseFormSchema
} from '@/features/users/types/app';
import { useUser } from '@/hooks/use-user';
import { PaymentButton } from '@/features/payments/components/payment-button';

interface PurchaseSlotsDialogProps {
  projectId: string;
  slotPrice: number;
  availableSlots: number;
}

export function PurchaseSlotsDialog({
  projectId,
  slotPrice,
  availableSlots
}: PurchaseSlotsDialogProps) {
  const [open, setOpen] = useState(false);
  const { user, status } = useUser();

  const form = useForm<PurchaseFormRequest>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      slots: 1
    }
  });

  const slots = form.watch('slots');
  const totalAmount = slots * slotPrice;

  const onSubmit = async (data: PurchaseFormRequest) => {
    try {
      // TODO: Implement purchase logic
      setOpen(false);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  if (!user) {
    return;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Buy Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Slots</DialogTitle>
          <DialogDescription>
            Select the number of slots you want to buy.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="slots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Slots</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={availableSlots}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Available slots: {availableSlots}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Price per slot:</span>
                <span>₦{formatCurrency(slotPrice)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>₦{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <DialogFooter>
              {/* <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? 'Processing...'
                  : 'Proceed to Payment'}
              </Button> */}
              <PaymentButton
                email={user.email}
                projectId={projectId}
                userId={user.id}
                slots={slots}
                totalAmount={totalAmount}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
