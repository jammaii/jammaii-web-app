'use client';

import { PaystackButton } from 'react-paystack';
import {
  addTransactionFeeToAmount,
  createTransactionReference,
  formatPaymentAmount
} from '@/features/payments/utils';
import { env } from '@/env';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { GENERIC_ERROR_MESSAGE } from '@/constants/strings';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingScreen } from '@/components/general/loading-screen';

interface PaymentButtonProps {
  userId: string;
  projectId: string;
  email: string;
  totalAmount: number;
  slots: number;
}

interface PaymentConfig {
  reference: string;
  email: string;
  amount: number; // in kobo
  publicKey: string;
}

export const PaymentButton = ({
  userId,
  projectId,
  email,
  totalAmount,
  slots
}: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const config: PaymentConfig = {
    reference: createTransactionReference(userId, projectId),
    email,
    amount: formatPaymentAmount(addTransactionFeeToAmount(totalAmount)),
    publicKey: env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  };

  const { toastSuccess, toastError } = useToast();
  const router = useRouter();

  const createProject = api.project.createInvestment.useMutation({
    onSuccess: () => {
      toastSuccess({
        message: 'Congratulations! you have bought an asset successfully'
      });

      router.push(`/user/investments/`);
    },
    onError: (error) => {
      toastError({ message: GENERIC_ERROR_MESSAGE });
    }
  });

  const handlePaystackSuccessAction = async (reference: {
    reference: string;
  }) => {
    setIsLoading(true);
    const data = {
      transactionReference: reference.reference,
      projectId,
      slots,
      totalAmount
    };

    await createProject.mutateAsync(data);
    setIsLoading(false);
  };

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const componentProps = {
    ...config,
    text: 'Proceed to Payment',
    onSuccess: (reference: { reference: string }) =>
      handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction
  };

  if (isLoading) {
    return <LoadingScreen fullScreen />;
  }

  return (
    <Button isLoading={createProject.isPending}>
      <PaystackButton {...componentProps} />
    </Button>
  );
};
