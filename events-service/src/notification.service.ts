import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmailNotification(email: string) {
    await firstValueFrom(
      this.httpService
        .post(
          'http://localhost:8001/api/send-email',
          {
            email: email,
            message: 'Your seat has been joyfully reserved.',
          },
          {
            headers: {
              'x-api-key': 'My-API-SECRET-KEY',
            },
          },
        )
        .pipe(
          catchError((err) => {
            throw err;
          }),
        ),
    );
  }
}
