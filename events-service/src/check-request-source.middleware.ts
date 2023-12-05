import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import * as crypto from 'crypto';

@Injectable()
export class CheckRequestSourceMiddleware implements NestMiddleware {
  async use(
    req: Request,
    res: Response,
    next: (error?: any) => void,
  ): Promise<any> {
    // check if the header exists x-ns-key
    // check the hash with the real private api key from notification service
    // secret: My-API-SECRET-KEY (For demo purpose)
    const notificationServiceKey = req.headers['x-ns-key'];

    if (!notificationServiceKey) {
      throw new UnauthorizedException();
    }

    const hashedKey = crypto
      .createHmac('sha512', 'My-API-SECRET-KEY')
      .update('My-API-SECRET-KEY')
      .digest('hex');

    console.log('hashedKey - ', hashedKey);

    if (notificationServiceKey !== hashedKey) {
      throw new UnauthorizedException();
    }

    next();
  }
}
