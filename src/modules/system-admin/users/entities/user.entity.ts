import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;
}