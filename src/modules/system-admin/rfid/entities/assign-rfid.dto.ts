import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AssignRfidDto {
    @IsString()
    @IsNotEmpty()
    rfid: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}