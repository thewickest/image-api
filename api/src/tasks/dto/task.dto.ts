import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class TaskDto {
    @ApiProperty()
    @IsString()
    taskId: string
    @ApiProperty()
    status: string
    @ApiProperty()
    price: number
}