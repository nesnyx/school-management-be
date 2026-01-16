import { IsNotEmpty, IsString } from "class-validator";

export class CreateRfidDto {

    @IsString()
    @IsNotEmpty()
    rfid: string;

}
