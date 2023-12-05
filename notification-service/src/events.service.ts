import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientAppRegistrationService } from './client-app-registration.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clientAppRegistrationService: ClientAppRegistrationService,
  ) {}

  async confirmEmailNotificationSent(email: string) {
    const nsKeyHeader =
      await this.clientAppRegistrationService.getHashedAPIKey();

    console.log('nsKeyHeader - ', nsKeyHeader);

    await firstValueFrom(
      this.httpService
        .post(
          'http://localhost:8000/api/confirm-notification-sent',
          { email: email },
          {
            headers: {
              'x-ns-key': nsKeyHeader,
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
