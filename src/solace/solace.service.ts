import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as solace from 'solclientjs';

@Injectable()
export class SolaceService implements OnModuleInit, OnModuleDestroy {
  private session: any;
  private topic: string = 'your/topic'; // Update with your desired topic

  onModuleInit() {
    this.connect();
  }

  async connect() {
    const factory = solace.SolclientFactory;
    factory.init();

    this.session = factory.createSession({
      url: "wss://mr-connection-zxcgejfvn8p.messaging.solace.cloud:443",
      vpnName: "demo",
      userName: "solace-cloud-client",
      password: "smgg04sv9dr0fna2kb2asqvme8"
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

  // Other CRUD methods like subscribeMessage, deleteMessage can be added similarly

  async subscribeMessage() {
    try {
      this.session.subscribe({
        topic: this.topic,
        qos: 1,
      });
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
