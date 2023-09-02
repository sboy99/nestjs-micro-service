import { AbstractDocument } from '@app/common';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  validateBeforeSave: true,
  versionKey: false,
})
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
export const UserModelDef: ModelDefinition = {
  name: UserDocument.name,
  schema: UserSchema,
};
