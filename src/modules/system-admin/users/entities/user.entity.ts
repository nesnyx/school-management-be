

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { RfidCard } from '../../rfid/entities/rfid-cards.entity';
import { UserRole } from '../../access-control/entities/user-role.entity';

export enum Role {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    GURU = 'GURU',
    SISWA = 'SISWA',
    ORANG_TUA = 'ORANG_TUA',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    identifier: string;


    @Column()
    password: string;

    @Column({
        type: 'varchar',
        default: Role.SISWA,
    })
    role: Role;


    @OneToMany(() => RfidCard, (rfidCard) => rfidCard.user)
    rfidCards: RfidCard[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles: UserRole[];
}