import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Questions } from "./question.entity";


@Entity("exams")
export class Exams {

    @PrimaryGeneratedColumn("uuid")
    id : string


    @Column()
    name : string


    @Column({
        nullable:true
    })
    description : string


    @Column()
    startAt : Date
    
    @Column()
    endAt : Date

    @Column()
    duration : number

    @Column({
        nullable:true
    })
    status : string;

    @CreateDateColumn()
    createAt : Date

    @UpdateDateColumn()
    updateAt : Date

    @OneToMany(() =>  Questions, (question) => question.exam)
    question : Questions[]

    
}
