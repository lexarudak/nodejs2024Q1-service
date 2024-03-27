import { IsUUID } from 'class-validator';

export class ValidIdDto {
  @IsUUID(4)
  id: string;
}
