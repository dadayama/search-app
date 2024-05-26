import { z } from 'zod';

export const FormSchema = z.object({
  search_name: z.string().min(1, { message: '必須項目です' }),
  type: z.string().optional(),
  campaign: z.array(z.string()).optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
