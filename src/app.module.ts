import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolaceModule } from './solace/solace.module';
import { SolaceService } from './solace/solace.service';
import { SolaceController } from './solace/solace.controller';

@Module({
  imports: [SolaceModule],
  controllers: [SolaceController],
  providers: [SolaceService],
})
export class AppModule {}
