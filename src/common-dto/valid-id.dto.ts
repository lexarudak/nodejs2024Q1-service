import { IsNotEmpty, IsUUID } from 'class-validator';

export class ValidIdDto {
  @IsUUID(4)
  id: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}
