import { IsNotEmpty } from "class-validator";

export class CreateRfidDto {

    @IsNotEmpty()
    rfid: string;

}
