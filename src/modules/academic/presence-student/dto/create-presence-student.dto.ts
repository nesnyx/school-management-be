import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePresenceStudentDto {


    @IsNotEmpty()
    @IsString()
    rfid: string;
}
