import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Options } from "./option.entity";
import { Exams } from "./exam.entity";

@Entity("questions")
export class Questions {
    @PrimaryColumn("uuid")
    id: string

    @Column()
    text: string

    @Column()
    examId: string


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @OneToMany(() => Options, (option) => option.question)
    option : Options[]

    @ManyToOne(() => Exams, (exam) => exam.question)
    exam : Exams
}