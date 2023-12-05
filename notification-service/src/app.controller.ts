import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Send email notification :
   * - require private api key , from events service in order to access this api
   */
  @Post('api/send-email')
  @UseFilters()
  async sendEmailNotification(
    @Body() request: { email: string; message: string },
  ) {
    return this.appService.sendEmailNotification(request);
  }
}
