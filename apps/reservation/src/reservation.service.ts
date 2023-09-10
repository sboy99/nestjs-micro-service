import { PAYMENT_SERVICE } from '@app/common/constants';
import { MessagePatterns } from '@app/common/enums';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';
import Stripe from 'stripe';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepo } from './reservation.repo';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy,
    private readonly reservationRepo: ReservationRepo,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    return this.paymentService
      .send<Stripe.Response<Stripe.PaymentIntent>>(
        MessagePatterns.CREATE_CHARGE,
        {
          amount: createReservationDto.amount,
        },
      )
      .pipe(
        map((res) => {
          console.log(res);
          return this.reservationRepo.create({
            ...createReservationDto,
            invoiceId: res.id,
          });
        }),
        catchError((err) => {
          console.log(err);
          return err;
        }),
      );
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
