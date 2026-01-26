import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Questions } from "./question.entity";

@Entity("options")
export class Options {
    @PrimaryGeneratedColumn()
    id : string

    @Column()
    text : string

    @Column()
    questionId : string

    @Column()
    isCorrect : boolean

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @ManyToOne(() => Questions, (question) => question.option)
    question : Questions
}