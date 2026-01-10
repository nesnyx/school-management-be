import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.entity";

@Entity("roles")
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles: UserRole[];
}