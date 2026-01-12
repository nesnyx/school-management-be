import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ReferenceType {
    FEES_TUITION = 'FEES_TUITION',
    DONATION = 'DONATION'
}

@Entity('payments')
export class PaymentGateway {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ default: 'PENDING' })
    status: string;

    @Column()
    referenceType: ReferenceType;

    @Column()
    referenceId: number;

}
