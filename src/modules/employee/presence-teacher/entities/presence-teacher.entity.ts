import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("presence_teachers")
export class PresenceTeacher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacherId: number;

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
