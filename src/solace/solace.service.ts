/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as solace from 'solclientjs';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SolaceService implements OnModuleInit, OnModuleDestroy {
  private session: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private topic: string = 'your/topic';

  onModuleInit() {
    this.connect();
  }

  async connect() {
    const factory = solace.SolclientFactory;
    factory.init();

    this.session = factory.createSession({
      url: process.env.URL,
      vpnName: process.env.VPN_NAME,
      userName: process.env.USER_NAME,
      password: process.env.PASSWD
    });

    try {
      await this.session.connect();
      console.log('Connected to Solace');
    } catch (error) {
      console.error('Error connecting to Solace:', error);
    }
  }

  async publishMessage(message: string) {
    try {
      this.session.publish({
        topic: this.topic,
        content: Buffer.from(message),
      });
      console.log('Message published successfully');
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }

  async subscribeMessage() {
    try {
      this.session.subscribe({
        topic: this.topic,
        qos: 1,
      });
      console.log("the topic is............ :",this.topic);
      
      console.log('Subscribed to topic:', this.topic);
    } catch (error) {
      console.error('Error subscribing to topic:', error);
    }
  }

  async deleteMessage() {
    try {
      this.session.unsubscribe({
        topic: this.topic,
      });
      console.log('Unsubscribed from topic:', this.topic);
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
    }
  }

  onModuleDestroy() {
    if (this.session) {
      this.session.disconnect();
      console.log('Disconnected from Solace');
    }
  }
}
