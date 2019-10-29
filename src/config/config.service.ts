import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

export type EnvConfig = Record<string, string>;

export interface ValidConfig {
  NODE_ENV: string;
  SERVICE_HOST: string;
  SERVICE_PORT: number;
  RMQ_HOST: string;
  RMQ_EXCHANGE: string;
  npm_package_name: string;
  npm_package_gitHead: string;
  npm_package_version: string;
}

export class ConfigService {
  private readonly config: ValidConfig;
  private schema: Joi.ObjectSchema = Joi.object({
    NODE_ENV: Joi.string().default('local'),
    SERVICE_HOST: Joi.string().default('0.0.0.0'),
    SERVICE_PORT: Joi.number().default(3000),
    RMQ_HOST: Joi.string().default('amqp://localhost:5672'),
    RMQ_EXCHANGE: Joi.string().default('exchange1'),
    npm_package_name: Joi.string(),
    npm_package_gitHead: Joi.string(),
    npm_package_version: Joi.string()
  }).options({ stripUnknown: true });

  constructor(path: string) {
    dotenv.config({ path });
    this.config = this.validate(process.env);
  }

  static setup(): ConfigService {
    return new ConfigService(`${process.env.NODE_ENV || 'local'}.env`);
  }

  private validate(config: EnvConfig): ValidConfig {
    const { error, value } = this.schema.validate(config);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return value;
  }

  get env(): string {
    return this.config.NODE_ENV;
  }

  get serviceHost(): string {
    return this.config.SERVICE_HOST;
  }

  get servicePort(): number {
    return this.config.SERVICE_PORT;
  }

  get serviceName(): string {
    return this.config.npm_package_name;
  }

  get gitHash(): string {
    return this.config.npm_package_gitHead;
  }

  get serviceVersion(): string {
    return this.config.npm_package_version;
  }

  get rmqUrl(): string {
    return this.config.RMQ_HOST;
  }

  get rmqExchange(): string {
    return this.config.RMQ_EXCHANGE;
  }
}
