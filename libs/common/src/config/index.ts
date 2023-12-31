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
// > auth
export const AUTH_HOST = TCP_HOST;
export const AUTH_PORT = TCP_PORT;
// > payment
export const PAYMENT_HOST = TCP_HOST;
export const PAYMENT_PORT = TCP_PORT;
// > notification
export const NOTIFICATION_HOST = TCP_HOST;
export const NOTIFICATION_PORT = TCP_PORT;

// stripe service
export const STRIPE_SECRET = z.string();
export const STRIPE_RETURN_URL = z.string();

// rabbitmq
export const RABBITMQ_URI = z.string();
// export const RABBITMQ_QUEUE = z.string();
