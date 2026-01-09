import { IsNotEmpty } from "class-validator";
import { Role } from "../entities/user.entity";

export class CreateUserDto {

    @IsNotEmpty()
    identifier: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: Role;
}
