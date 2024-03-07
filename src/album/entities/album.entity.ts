import { CreateAlbumDto } from '../dto/create-album.dto';
import { v4 as uuid } from 'uuid';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor({ name, year, artistId }: CreateAlbumDto) {
    this.id = uuid();
    this.name = name;
    this.year = year;
    this.artistId = artistId || null;
  }
}
