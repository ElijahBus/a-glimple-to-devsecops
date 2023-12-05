import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotificationService } from './notification.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async listReservations() {
    return this.prismaService.reservation.findMany();
  }

  async listEvents() {
    return this.prismaService.event.findMany({
      select: {
        name: true,
        Reservation: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async makeReservation(request: { event_id: number; email: string }) {
    const event = await this.prismaService.event.findFirst({
      where: { id: request.event_id },
    });

    if (!event) {
      throw new BadRequestException('Could not find the specified event');
    }

    await this.prismaService.reservation.create({
      data: {
        event_id: request.event_id,
        email: request.email,
      },
    });

    await this.notificationService
      .sendEmailNotification(request.email)
      .catch(() => {
        throw new BadRequestException();
      });

    return 'Seat reserved';
  }

  confirmNotificationSent(request: { email: string }) {
    Logger.log(
      `*** Processing your submitted order - Email : ${request.email} ***`,
    );

    return 'Confirmed';
  }
}
