import { IsNotEmpty, IsString } from "class-validator";

export class CreateParentDto {
    @IsNotEmpty()
    @IsString()
    telp: string;

    @IsNotEmpty()
    @IsString()
    fullName: string;
}
