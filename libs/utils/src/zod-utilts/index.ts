import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const mongoObjectId = z
  .string()
  .refine((arg) => isValidObjectId(arg), 'Provide valid mongo object id');
