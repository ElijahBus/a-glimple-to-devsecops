import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientAppRegistrationService } from './client-app-registration.service';

@Injectable()
export class ValidateApiKeyMiddleware implements NestMiddleware {
  constructor(
    private readonly clientAppRegistrationService: ClientAppRegistrationService,
  ) {}

  use(req: Request, res: Response, next: (error?: any) => void): any {
    const apiKeyHeader = req.headers['x-api-key'];

    if (!this.clientAppRegistrationService.validateAPIKey(apiKeyHeader)) {
      throw new UnauthorizedException();
    }

    next();
  }
}
