
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';
import { PaymentGateway } from './entities/payment-gateway.entity';
import { NotFoundException } from '@nestjs/common';

@Processor('payment-queue')
export class PaymentProcessor extends WorkerHost {
    constructor(
        @InjectRepository(PaymentGateway)
        private readonly paymentGatewayRepository: Repository<PaymentGateway>,
        private readonly eventEmitter: EventEmitter2,
    ) {
        super();
    }

    async process(job: Job<any>): Promise<any> {

        const payload = job.data;
        const payment = await this.paymentGatewayRepository.findOne({
            where: { id: payload.order_id }
        });

        if (!payment) {
            throw new Error('Payment not found');
        }

        const status = payload.transaction_status;
        let newStatus = 'PENDING';

        if (status == 'capture' || status == 'settlement') {
            newStatus = (payload.fraud_status == 'challenge') ? 'CHALLENGE' : 'SUCCESS';
        } else if (['cancel', 'deny', 'expire'].includes(status)) {
            newStatus = 'FAILED';
        }

        payment.status = newStatus;
        await this.paymentGatewayRepository.save(payment);

        this.eventEmitter.emit(`payment.updated.${payment.referenceType}`, {
            referenceType: payment.referenceType,
            referenceId: payment.referenceId,
            status: newStatus,
            midtransTransactionId: payload.transaction_id,
            paymentType: payload.payment_type,
        });


    }
}