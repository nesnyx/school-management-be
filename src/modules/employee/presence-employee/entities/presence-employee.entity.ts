import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("presence_employees")
export class PresenceEmployee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    staffId: number;

    @Column()
    rfidId: number;

    @Column()
    date: string;

    @Column()
    timeIn: Date;

    @Column()
    timeOut: Date;

    @Column()
    status: string;
}
