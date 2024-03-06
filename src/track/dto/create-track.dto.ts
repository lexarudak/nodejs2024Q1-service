import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId?: string; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId?: string; // refers to Album

  @IsNumber()
  @IsInt()
  @Min(1)
  duration: number; // integer number
}
