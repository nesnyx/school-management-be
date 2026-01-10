import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFeesTuitionDto {

    @IsNotEmpty()
    @IsNumber()
    amount: number;

}
