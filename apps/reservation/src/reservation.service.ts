import { PAYMENT_SERVICE } from '@app/common/constants';
import { CreateChargeDto } from '@app/common/dto';
import { MessagePatterns } from '@app/common/enums';
import { TUser } from '@app/common/types';
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

  create(user: TUser, createReservationDto: CreateReservationDto) {
    return this.paymentService
      .send<Stripe.Response<Stripe.PaymentIntent>, CreateChargeDto>(
        MessagePatterns.CREATE_CHARGE,
        {
          userId: user._id,
          email: user.email,
          amount: createReservationDto.amount,
        },
      )
      .pipe(
        map((res) => {
          return this.reservationRepo.create({
            userId: user._id,
            invoiceId: res.id,
            ...createReservationDto,
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
