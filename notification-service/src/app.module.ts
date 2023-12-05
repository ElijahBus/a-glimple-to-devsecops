import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientAppRegistrationService } from './client-app-registration.service';
import { ValidateApiKeyMiddleware } from './validate-api-key.middleware';
import { EventsService } from './events.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ClientAppRegistrationService, EventsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(ValidateApiKeyMiddleware)
      .forRoutes({ path: '/api/send-email', method: RequestMethod.POST });
  }
}
