import { z } from 'zod';

const email = z.string().email().optional();
const password = z.string().optional();

export const UpdateUserSchema = z.object({
  email,
  password,
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
