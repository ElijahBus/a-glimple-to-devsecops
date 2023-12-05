import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/reservations')
  async listReservations() {
    return this.appService.listReservations();
  }

  @Post('/api/reservations')
  async makeReservation(@Body() request: { event_id: number; email: string }) {
    return this.appService.makeReservation(request).catch((error) => {
      throw error;
    });
  }

  @Get('/api/events')
  async listEvents() {
    return this.appService.listEvents();
  }

  /**
   * Used by the notification service to notify back that the notification
   * was successfully sent to a specific user. ( hook )
   *
   * This communication will be protected with https, and proof of concept key,
   * the API key will be passed back in a header from the notification service, hashed.
   * This service will then check the hashed key with the original private one saved to
   * confirm whether the request is from a trusted source, the notification service.
   */
  @Post('/api/confirm-notification-sent')
  confirmNotificationSent(@Body() request: { email: string }) {
    this.appService.confirmNotificationSent(request);
  }
}
