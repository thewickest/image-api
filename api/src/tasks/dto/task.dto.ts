export class TaskDto {
    taskId: string
    status: string
    price: number
    images?: ImageDto[]
}

export class ImageDto {
    resolution: number
    path: string
}