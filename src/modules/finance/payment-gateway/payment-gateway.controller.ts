import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';


@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) { }


  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleMidtransNotification(@Body() payload: any) {
    console.log('Incoming Webhook:', payload);
    await this.paymentGatewayService.handleWebhook(payload);
    return {
      status: 'success',
      message: 'Notification processed successfully',
    };
  }



}
