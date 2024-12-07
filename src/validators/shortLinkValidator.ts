import { z } from 'zod';

export const createShortLinkSchema = z.object({
  originalUrl: z
    .string()
    .url({ message: 'originalUrl must be a valid URL' })
    .min(1, { message: 'originalUrl is required' }),
});
