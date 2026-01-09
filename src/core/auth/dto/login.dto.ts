import { IsString, MinLength, MaxLength } from "class-validator";

export class LoginDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    identifier: string;

    @IsString()
    @MinLength(8)
    password: string;
}
