import { Injectable, Logger } from '@nestjs/common';
import { EventsService } from './events.service';

@Injectable()
export class AppService {
  constructor(private readonly eventsService: EventsService) {}

  async sendEmailNotification(request: { email: string; message: string }) {
    // Send email notification here ...
    Logger.log(
      `*** New Email Notification Sent to - ${request.email} - Content: ${request.message}***`,
    );

    // Confirm email notification sent to the events service
    await this.eventsService.confirmEmailNotificationSent(request.email);
  }
}
