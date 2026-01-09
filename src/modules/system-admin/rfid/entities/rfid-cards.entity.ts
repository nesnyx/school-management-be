import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('rfid_cards')
export class RfidCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    rfidUuid: string;

    @Column({ default: 'ACTIVE' })
    status: 'ACTIVE' | 'INACTIVE' | 'LOST';

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.rfidCards)
    @JoinColumn({ name: 'userId' })
    user: User;
}