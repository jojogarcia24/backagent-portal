import { z } from 'zod';

export const ContactCreate = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(7).max(30).optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
});

export const ContactUpdate = ContactCreate.partial();
