import type { AnyZodObject, ZodEffects, z } from 'zod';

type SchemaParseError = {
  message: string;
  field: string;
};

export const safeParseSchema = <
  T extends AnyZodObject | ZodEffects<AnyZodObject>
>(
  schema: T,
  data: unknown
): { result: z.infer<T>; errors: false } | { errors: SchemaParseError[] } => {
  const parsing = schema.safeParse(data);

  if (!parsing.success) {
    const errors = parsing.error.errors.map((e) => ({
      message: e.message,
      field: `${e.path[0]}:${e.path[1]}`
    }));
    return { errors };
  }

  return { result: parsing.data, errors: false };
};
