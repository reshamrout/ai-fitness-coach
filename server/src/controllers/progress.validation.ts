import { z } from 'zod';

export const logProgressSchema = z.object({
  body: z.object({
    planId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Plan ID').optional(),
    date: z.string().datetime({ message: "Invalid date format. Expected ISO 8601 string." }),
    completedExercises: z.array(z.string()),
    mood: z.enum(['great', 'good', 'okay', 'tired']),
    notes: z.string().optional(),
  }),
});

export const progressIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
  }),
});
