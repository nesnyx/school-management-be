import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("presence_employees")
export class PresenceEmployee {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    staffId: string;

    @Column()
    rfidId: string;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'timestamp', nullable: true })
    timeIn: Date;

    @Column({ type: 'timestamp', nullable: true })
    timeOut: Date;

    @Column()
    status: string;
}
