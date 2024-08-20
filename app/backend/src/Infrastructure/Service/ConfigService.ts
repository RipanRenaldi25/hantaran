import { IConfigService } from '../../Application/Service';

export class ConfigService implements IConfigService {
  private static instance: ConfigService;
  private constructor() {}
  get(key: string): string {
    return process.env[key] as string;
  }

  static getInstance() {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }
}
