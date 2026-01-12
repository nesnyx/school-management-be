import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("fees_tuitions")
export class FeesTuition {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    invoiceId: string

    @Column()
    amount: number;

    @Column({ default: 'PENDING' })
    status: string;

    @Column({ nullable: true })
    midtransTransactionId: string;

    @Column({ nullable: true })
    paymentType: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
