import { ApiProperty } from "@nestjs/swagger";
import { TaskDto } from "./task.dto";

export class ImageDto {
    @ApiProperty()
    resolution: number
    @ApiProperty()
    path: string
}

export class TaskImageDto extends TaskDto {
    @ApiProperty({type: ImageDto})
    images?: ImageDto[];
}