import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("presence_teachers")
export class PresenceTeacher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacherId: number;

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
