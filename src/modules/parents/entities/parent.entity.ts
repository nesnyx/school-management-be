import { User } from "src/modules/system-admin/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StudentParent } from "./student-parent.entity";

@Entity("parents")
export class Parent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    telp: string;

    @Column()
    fullName: string;


    @Column()
    userId: string;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;


    @OneToMany(() => StudentParent, (studentParent) => studentParent.parent)
    studentParent: StudentParent[]
}
