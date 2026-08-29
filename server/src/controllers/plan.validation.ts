import { z } from 'zod';

export const generatePlanSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.union([z.string(), z.number()]),
    gender: z.string(),
    height: z.union([z.string(), z.number()]),
    weight: z.union([z.string(), z.number()]),
    goal: z.string(),
    level: z.string(),
    location: z.string(),
    diet: z.string(),
    medical: z.string().optional(),
  }),
});

export const updatePlanLabelSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
  }),
  body: z.object({
    label: z.string().min(1, 'Label is required'),
  }),
});

export const planIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
  }),
});
