import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor({ name, grammy }: CreateArtistDto) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }
}
