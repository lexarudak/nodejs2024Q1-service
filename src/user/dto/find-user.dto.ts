import { IsUUID } from 'class-validator';

export class FindOneUserDto {
  @IsUUID(4)
  id: string;
}
