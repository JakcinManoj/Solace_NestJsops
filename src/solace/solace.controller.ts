import { Body, Controller, Get, Post } from '@nestjs/common';
import { SolaceService } from './solace.service';

@Controller('solace')
export class SolaceController {
  constructor(private readonly solaceService: SolaceService) {}

  @Post('publish')
  async publish(@Body('message') message: string) {
    await this.solaceService.publishMessage(message);
    return { message: 'Message published successfully' };
  }

  @Get('subscribe')
  async subscribe() {
    await this.solaceService.subscribeMessage();
    return { message: 'Subscribed to topic successfully' };
  }

  @Get('unsubscribe')
  async unsubscribe() {
    await this.solaceService.deleteMessage();
    return { message: 'Unsubscribed from topic successfully' };
  }

  // Implement other CRUD endpoints as needed
}
