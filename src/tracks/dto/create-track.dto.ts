import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  artistId?: string; // refers to Artist

  @IsString()
  albumId?: string; // refers to Album

  @IsNumber()
  @IsInt()
  duration: number; // integer number
}
