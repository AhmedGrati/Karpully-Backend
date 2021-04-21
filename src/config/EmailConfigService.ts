import {ConfigService} from '@nestjs/config';
import {EnvironmentVariables} from '../common/EnvironmentVariables';

class EmailConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}
  public getEmailCredentials() {
    return {
      user: this.configService.get<String>('KARPULLY_EMAIL_LOGIN'),
      pass: this.configService.get<String>('KARPULLY_EMAIL_PASSWORD'),
    };
  }
}
export const emailCredentials = new EmailConfigService(
  new ConfigService<EnvironmentVariables>(),
).getEmailCredentials();
