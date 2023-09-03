import { AbstractDocument } from '@app/common';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';

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

// hooks
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  next();
});

export const UserModelDef: ModelDefinition = {
  name: UserDocument.name,
  schema: UserSchema,
};
