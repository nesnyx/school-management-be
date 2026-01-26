import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExamDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsDate()
    @IsNotEmpty()
    startAt: Date

    @IsDate()
    @IsNotEmpty()
    endAt: Date


    @IsNotEmpty()
    @IsNumber()
    duration: number


    @IsOptional()
    @IsString()
    description : string
}