import { UserDocument } from '@/auth/src/user/models/user.schema';

type Transform<T extends object, K extends keyof T, U> = {
  [Key in keyof T]: Key extends K ? U : T[Key];
};

export type TUser = Transform<UserDocument, '_id', string>;
