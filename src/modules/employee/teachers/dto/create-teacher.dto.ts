import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    @IsNotEmpty()
    nip: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;
}
