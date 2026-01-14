import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("presence_employees")
export class PresenceEmployee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    staffId: number;

    @Column()
    rfidId: number;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'timestamp', nullable: true })
    timeIn: Date;

    @Column({ type: 'timestamp', nullable: true })
    timeOut: Date;

    @Column()
    status: string;
}
