import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("rfids")
export class Rfid {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rfid: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
