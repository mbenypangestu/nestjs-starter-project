import { Module } from '@nestjs/common';
import { CustomConfigService } from './custom-config.service';

@Module({
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
