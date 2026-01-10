import { IsNotEmpty, IsString } from "class-validator";

export class CreateStaffDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;
}
