import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}