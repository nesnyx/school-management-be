import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentGateway, ReferenceType } from './entities/payment-gateway.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class PaymentGatewayService {
  constructor(
    @InjectRepository(PaymentGateway)
    private readonly paymentGatewayRepository: Repository<PaymentGateway>,
    private readonly eventEmitter: EventEmitter2) { }
  private snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: String(process.env.MIDTRANS_SERVER_KEY),
    clientKey: String(process.env.MIDTRANS_CLIENT_KEY),
  });

  generateInvoiceNumber() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const datePart = `${year}${month}${day}`;
    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `INV-${datePart}-${randomPart}`;
  }


  async createPayment(amount: number, referenceType: ReferenceType, referenceId: string, status: string) {
    const payment = this.paymentGatewayRepository.create({
      amount,
      referenceType,
      referenceId,
      status,
    });
    return await this.paymentGatewayRepository.save(payment);
  }

  async createTransaction(orderId: string, amount: number, name: string) {
    try {
      const parameters = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        item_details: [
          {
            id: orderId,
            quantity: 1,
            price: amount,
            name: name,
          },
        ],
        enabled_payments: ['gopay'],
      };

      const result = await this.snap.createTransaction(parameters);
      await this.paymentGatewayRepository.update({ referenceId: orderId }, { redirectUrl: result.redirect_url });
      return result;
    } catch (error: any) {
      console.error('Midtrans Error:', error.message);
      throw new BadRequestException('Gagal membuat transaksi ke Midtrans');
    }
  }

  async handleWebhook(payload: any) {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const dataToHash = payload.order_id + payload.status_code + payload.gross_amount + serverKey;
    const hash = crypto.createHash('sha512').update(dataToHash).digest('hex');

    if (payload.signature_key !== hash) {
      throw new BadRequestException('Invalid Signature');
    }
    const payment = await this.paymentGatewayRepository.findOne({
      where: { referenceId: payload.order_id }
    });
    if (!payment) throw new NotFoundException('Payment record not found');
    const status = payload.transaction_status;
    const fraud = payload.fraud_status;
    let newStatus = 'PENDING';

    if (status == 'capture' || status == 'settlement') {
      if (fraud == 'challenge') newStatus = 'CHALLENGE';
      else newStatus = 'SUCCESS';
    } else if (['cancel', 'deny', 'expire'].includes(status)) {
      newStatus = 'FAILED';
    }

    payment.status = newStatus;
    await this.paymentGatewayRepository.save(payment);
    const emitResult = this.eventEmitter.emit('payment.updated', {
      referenceType: payment.referenceType,
      referenceId: payment.referenceId,
      status: newStatus,
      midtransTransactionId: payload.transaction_id,
      paymentType: payload.payment_type,
    });
    console.log('Emit Result:', emitResult);


    return { status: 'OK' };
  }


}
