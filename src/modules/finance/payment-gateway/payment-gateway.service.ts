import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Queue } from 'bullmq'
import { PaymentGateway, ReferenceType } from './entities/payment-gateway.entity';

import { InjectQueue } from '@nestjs/bullmq';
@Injectable()
export class PaymentGatewayService {
  constructor(
    @InjectRepository(PaymentGateway)
    private readonly paymentGatewayRepository: Repository<PaymentGateway>,
    @InjectQueue('payment-queue') private paymentQueue: Queue) { }
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


  async createPayment(amount: number, referenceType: ReferenceType, referenceId: string, status: string, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(PaymentGateway) : this.paymentGatewayRepository;
    const existingPayment = await repo.findOne({
      where: { referenceId, referenceType, status: 'PENDING' }
    });
    if (existingPayment) {
      return existingPayment;
    }
    const payment = repo.create({
      amount,
      referenceType,
      referenceId,
      status,
    });
    return await repo.save(payment);
  }

  async createTransaction(orderId: string, amount: number, name: string) {
    try {
      const existing = await this.paymentGatewayRepository.findOne({ where: { id: orderId } });
      if (existing?.redirectUrl) {
        return {
          token: existing.snapToken,
          redirect_url: existing.redirectUrl
        };
      }
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
      return result;
    } catch (error: any) {

      throw new BadRequestException('Gagal membuat transaksi ke Midtrans');
    }
  }

  async handleWebhook(payload: any) {

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const dataToHash = payload.order_id + payload.status_code + payload.gross_amount + serverKey;
    const hash = crypto.createHash('sha512').update(dataToHash).digest('hex');
    if (payload.signature_key !== hash) throw new BadRequestException('Invalid Signature');


    await this.paymentQueue.add('process-payment-status', payload, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });

    return { status: 'OK' };
  }


  async update(id: string, redirectUrl: string, snapToken: string) {
    const existingPayment = await this.paymentGatewayRepository.findOne({ where: { id } })
    if (!existingPayment) {
      throw new NotFoundException("Payment Not Existing")
    }
    const update = this.paymentGatewayRepository.merge(existingPayment, {
      redirectUrl: redirectUrl,
      snapToken: snapToken
    })
    return await this.paymentGatewayRepository.save(update)
  }


  async getPaymentByReference(referenceId: string) {
    const existingPayment = await this.paymentGatewayRepository.findOne({ where: { referenceId: referenceId } })
    if (!existingPayment) {
      throw new NotFoundException("Payment Not Existing")
    }
    return existingPayment
  }


 


}
