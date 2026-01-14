import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity("presence_students")
export class PresenceStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentId: number;

    @Column({ type: 'date' })
    date: string;


    @Column({ type: 'timestamp', nullable: true })
    timeIn: Date;

    @Column({ type: 'timestamp', nullable: true })
    timeOut: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}