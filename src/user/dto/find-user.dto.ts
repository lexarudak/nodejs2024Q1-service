import { IsUUID } from 'class-validator';
import { UUID } from 'src/utils/intefaces';

export class FindOneUser {
  @IsUUID()
  id: UUID;
}
