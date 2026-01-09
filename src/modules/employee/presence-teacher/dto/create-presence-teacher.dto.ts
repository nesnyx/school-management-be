import { IsNotEmpty, IsString } from "class-validator";

export class CreatePresenceTeacherDto {

    @IsNotEmpty()
    @IsString()
    rfid: string
}
