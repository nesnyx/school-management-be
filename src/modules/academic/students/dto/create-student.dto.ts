import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    nis: string

    @IsNotEmpty()
    @IsString()
    fullName: string

}
