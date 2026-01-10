import { IsNotEmpty, IsString } from "class-validator";

export class CreateAccessControlDto { }


export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

}