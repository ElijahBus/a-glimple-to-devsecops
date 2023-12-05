import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { HttpModule } from '@nestjs/axios';
import { NotificationService } from './notification.service';
import { CheckRequestSourceMiddleware } from './check-request-source.middleware';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, NotificationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckRequestSourceMiddleware).forRoutes({
      path: '/api/confirm-notification-sent',
      method: RequestMethod.POST,
    });
  }
}
