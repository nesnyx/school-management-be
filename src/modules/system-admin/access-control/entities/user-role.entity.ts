import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Roles } from "../entities/roles.entity";

@Entity('user_roles')
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    roleId: string;

    @ManyToOne(() => User, (user) => user.userRoles)
    user: User;

    @ManyToOne(() => Roles, (role) => role.userRoles)
    role: Roles;

    @CreateDateColumn()
    assignedAt: Date;
}