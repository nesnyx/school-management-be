import { IsNotEmpty, IsString } from "class-validator";

export class AssignParentDto {
    @IsString()
    @IsNotEmpty()
    userId : string

    @IsString()
    @IsNotEmpty()
    parentId : string
}