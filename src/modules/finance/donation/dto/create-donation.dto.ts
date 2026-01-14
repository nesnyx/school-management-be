import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDonationDto {

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
