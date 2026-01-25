import { User } from "src/modules/system-admin/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Parent } from "./parent.entity";

@Entity("student_parents")
export class StudentParent {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    userId : string
 
    @Column()
    parentId : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updateAt : Date

    @ManyToOne(() => User, (user) => user.studentParent)
    user : User
    
    @ManyToOne(() => Parent , (parent) => parent.studentParent)
    parent : Parent
}