import { AbstractRepo } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationRepo extends AbstractRepo<ReservationDocument> {
  protected readonly logger = new Logger(ReservationRepo.name);
  constructor(
    @InjectModel(ReservationDocument.name)
    readonly reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
