import { Injectable } from '@nestjs/common';

import { ConfigService } from './config/config.service';

export interface StatusResponse {
  serviceName: string;
  gitHash: string;
  version: string;
}

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getServiceStatus(): StatusResponse {
    return {
      serviceName: this.config.serviceName,
      gitHash: this.config.gitHash,
      version: this.config.serviceVersion
    };
  }
}
