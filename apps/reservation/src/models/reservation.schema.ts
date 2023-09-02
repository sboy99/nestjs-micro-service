import { AbstractDocument } from '@app/common';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  //   validateBeforeSave: true,
})
export class ReservationDocument extends AbstractDocument {
  @Prop()
  userId: string;

  @Prop()
  placeId: string;

  @Prop()
  invoiceId: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);

export const ReservationModelDef: ModelDefinition = {
  name: ReservationDocument.name,
  schema: ReservationSchema,
};
