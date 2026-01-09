import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";




@Entity("presence_students")
export class PresenceStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentId: number;

    @Column({ type: 'varchar', length: 10 })
    date: string;

    @Column({ type: 'datetime', nullable: true })
    timeIn: Date;

    @Column({ type: 'datetime', nullable: true })
    timeOut: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}