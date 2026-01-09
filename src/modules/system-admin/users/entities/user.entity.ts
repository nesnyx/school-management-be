// src/modules/system-admin/users/entities/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { RfidCard } from '../../rfid/entities/rfid-cards.entity'; // Sesuaikan path-nya

export enum Role {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    GURU = 'GURU',
    SISWA = 'SISWA',
    ORANG_TUA = 'ORANG_TUA',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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
}