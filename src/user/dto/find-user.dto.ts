import { IsUUID } from 'class-validator';
import { UUID } from 'src/utils/intefaces';

export class FindOneUserDto {
  @IsUUID()
  id: UUID;
}
