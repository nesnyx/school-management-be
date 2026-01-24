import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ReferenceType {
    FEES_TUITION = 'FEES_TUITION',
    DONATION = 'DONATION'
}

@Entity('payments')
export class PaymentGateway {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @Column({ default: 'PENDING' })
    status: string;

    @Column()
    referenceType: ReferenceType;


    @Column()
    referenceId: string;


    @Column({ nullable: true })
    redirectUrl: string;

    @Column({ nullable: true })
    snapToken : string
}
