import { genericStringSchema, numberSchema } from '@/validation/shared.schema';
import { z } from 'zod';

type SchemaField<T> = {
  column: string;
  type:
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | DateConstructor;
  format?: string;
  value: (row: T) => any;
};
