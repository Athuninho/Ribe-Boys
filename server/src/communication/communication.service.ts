import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AfricasTalking from 'africastalking';

@Injectable()
export class CommunicationService {
  private at: any;
  private sms: any;
  private readonly logger = new Logger(CommunicationService.name);

  constructor(private configService: ConfigService) {
    const username = this.configService.get('AT_USERNAME') || 'sandbox';
    const apiKey = this.configService.get('AT_API_KEY');

    this.at = AfricasTalking({
      username,
      apiKey,
    });
    this.sms = this.at.SMS;
  }

  async sendSMS(to: string | string[], message: string) {
    const options = {
      to: Array.isArray(to) ? to : [to],
      message,
      from: this.configService.get('AT_SHORTCODE') || undefined,
    };

    try {
      const response = await this.sms.send(options);
      this.logger.log(`SMS sent successfully to ${to}`);
      return response;
    } catch (error) {
      this.logger.error('Failed to send SMS via Africa\'s Talking', error);
      throw error;
    }
  }

  async sendFeeReminder(parentName: string, studentName: string, balance: number, phone: string) {
    const message = `Dear ${parentName}, this is a reminder that ${studentName} has an outstanding fee balance of Ksh ${balance.toLocaleString()} at Ribe Boys Senior School. Please clear the balance to avoid inconvenience.`;
    return this.sendSMS(phone, message);
  }

  async sendEmergencyAlert(message: string, phones: string[]) {
    const fullMessage = `URGENT - RIBE BOYS: ${message}`;
    return this.sendSMS(phones, fullMessage);
  }
}
