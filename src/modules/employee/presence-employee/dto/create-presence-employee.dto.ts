import { IsNotEmpty, IsString } from "class-validator";

export class CreatePresenceEmployeeDto {
    @IsString()
    @IsNotEmpty()
    rfid: string;
}
