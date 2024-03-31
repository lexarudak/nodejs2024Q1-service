import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsOptional()
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
  @IsOptional()
  duration: number; // integer number
}
