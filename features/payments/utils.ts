import { getDateTimeString } from '@/lib/dates';
import { PAYMENT_AMOUNT_SCALE } from './constants';

export const formatPaymentAmount = (amount: number): number =>
  amount * PAYMENT_AMOUNT_SCALE;

export const createTransactionReference = (
  userId: string,
  projectId: string
): string => `${userId}-${projectId}-${getDateTimeString()}`;

export const addTransactionFeeToAmount = (amount: number): number => {
  const FLAT_FEE = 100;
  const PERCENTAGE_FEE = 0.015; // 1.5%
  const MAX_FEE = 2000;

  const percentageFee = amount * PERCENTAGE_FEE;
  const totalFee = Math.min(percentageFee + FLAT_FEE, MAX_FEE);

  return amount + totalFee;
};
