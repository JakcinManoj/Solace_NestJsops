import { Module } from '@nestjs/common';
import { SolaceService } from './solace.service';
import { SolaceController } from './solace.controller';

@Module({
  controllers: [SolaceController],
  providers: [SolaceService]
})
export class SolaceModule {}
