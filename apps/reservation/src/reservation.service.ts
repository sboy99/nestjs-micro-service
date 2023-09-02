import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepo } from './reservation.repo';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepo: ReservationRepo) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepo.create({
      ...createReservationDto,
    });
  }

  findAll() {
    return this.reservationRepo.list({});
  }

  findOne(_id: string) {
    return this.reservationRepo.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reservationRepo.findOneAndDelete({ _id });
  }
}
