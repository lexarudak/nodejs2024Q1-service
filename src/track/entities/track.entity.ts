import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
  constructor({ name, artistId, albumId, duration }: CreateTrackDto) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
    this.duration = duration;
  }
}
