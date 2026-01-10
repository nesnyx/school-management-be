import { BadRequestException, Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeesTuition } from '../fees-tuition/entities/fees-tuition.entity';
@Injectable()
export class PaymentGatewayService {
  constructor(@InjectRepository(FeesTuition)
  private feesTuitionRepository: Repository<FeesTuition>) { }
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

  async createTransaction(tuitionId: number, amount: number) {
    try {
      const parameters = {
        transaction_details: {
          order_id: tuitionId.toString(),
          gross_amount: amount,
        },
        item_details: [
          {
            id: `FEES-${tuitionId}`,
            price: amount,
            quantity: 1,
            name: `Pembayaran Uang Sekolah / SPP #${tuitionId}`,
          },
        ],
        customer_details: {
          first_name: "Customer",
          email: "customer@example.com",
        },
        usage_limit: 1,
        enabled_payments: ['gopay', 'shopeepay', 'bank_transfer', 'cstore'],
      };

      const result = await this.snap.createTransaction(parameters);

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

    const status = payload.transaction_status;
    const fraud = payload.fraud_status;
    let newStatus = 'PENDING';

    if (status == 'capture' || status == 'settlement') {
      if (fraud == 'challenge') newStatus = 'CHALLENGE';
      else newStatus = 'SUCCESS';
    } else if (['cancel', 'deny', 'expire'].includes(status)) {
      newStatus = 'FAILED';
    }

    await this.feesTuitionRepository.update(payload.order_id, {
      status: newStatus,
      midtransTransactionId: payload.transaction_id,
      paymentType: payload.payment_type,
    });

    return { status: 'OK' };
  }


}
