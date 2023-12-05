import { Injectable } from '@nestjs/common';

import * as crypto from 'crypto';

@Injectable()
export class ClientAppRegistrationService {
  /**
   * We assume there is a client app registration service, where 3rd party client app register
   * and get issued an API Key to access the api.
   *
   * We use a default API key of  "My-API-SECRET-KEY" for demo purpose.
   */

  validateAPIKey(apiKey: string | string[]) {
    return apiKey === 'My-API-SECRET-KEY';
  }

  async getHashedAPIKey() {
    return crypto
        .createHmac('sha512', 'My-API-SECRET-KEY' )
        .update('My-API-SECRET-KEY')
        .digest('hex');
  }
}
