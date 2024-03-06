import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  artistDB: Map<string, Artist>;
  constructor() {
    this.artistDB = new Map<string, Artist>();
  }

  getArtist(id: string) {
    const track = this.artistDB.get(id);
    if (!track?.id) {
      throw new NotFoundException(`Artist with this id not found`);
    }
    return track;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    this.artistDB.set(artist.id, artist);
    return artist;
  }

  findAll() {
    return Array.from(this.artistDB.values());
  }

  findOne(id: string) {
    return this.getArtist(id);
  }

  update(id: string, { name: newName, grammy: newGrammy }: UpdateArtistDto) {
    const { name, grammy } = this.getArtist(id);
    const newArtist = {
      id,
      name: newName || name,
      grammy: newGrammy !== undefined ? newGrammy : grammy,
    };
    this.artistDB.set(newArtist.id, newArtist);
    return newArtist;
  }

  remove(id: string) {
    const artist = this.getArtist(id);
    this.artistDB.delete(artist.id);
    return;
  }
}
