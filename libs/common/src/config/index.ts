import { z } from 'zod';

// .env variables
export const MONGO_URI = z.string();
export const JWT_SECRET = z.string();
export const JWT_EXPIRATION = z.string();
export const COOKIE_SECRET = z.string();

export const PORT = z.coerce.number();
export const HTTP_PORT = z.coerce.number();

export const TCP_HOST = z.string();
export const TCP_PORT = z.coerce.number();

// services addr
export const AUTH_HOST = TCP_HOST;
export const AUTH_PORT = TCP_PORT;

// stripe service
export const STRIPE_SECRET = z.string();
