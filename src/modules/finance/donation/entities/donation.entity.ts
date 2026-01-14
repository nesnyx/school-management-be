import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("donations")
export class Donation {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    amount: number;

    @Column({ nullable: true })
    paymentType: string;


    @Column({ nullable: true })
    midtransTransactionId: string;

    @Column({ default: 'PENDING' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}
