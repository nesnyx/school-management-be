

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { RfidCard } from '../../rfid/entities/rfid-cards.entity';
import { UserRole } from '../../access-control/entities/user-role.entity';
import { StudentParent } from 'src/modules/parents/entities/student-parent.entity';

export enum Role {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
    PARENT = 'PARENT',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    identifier: string;


    @Column()
    password: string;


    @OneToMany(() => RfidCard, (rfidCard) => rfidCard.user)
    rfidCards: RfidCard[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles: UserRole[];


    @OneToMany (()  => StudentParent, (studentParent) => studentParent.user)
    studentParent : StudentParent[]
}