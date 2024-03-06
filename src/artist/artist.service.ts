import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { albumDB, artistDB, trackDB } from 'src/db/db';

@Injectable()
export class ArtistService {
  getArtist(id: string) {
    const track = artistDB.get(id);
    if (!track?.id) {
      throw new NotFoundException(`Artist with this id not found`);
    }
    return track;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    artistDB.set(artist.id, artist);
    return artist;
  }

  findAll() {
    return Array.from(artistDB.values());
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
    artistDB.set(newArtist.id, newArtist);
    return newArtist;
  }

  remove(id: string) {
    const artist = this.getArtist(id);

    const tracks = Array.from(trackDB.entries());
    tracks.forEach(([key, track]) => {
      if (track.artistId === id) {
        trackDB.set(key, {
          ...track,
          artistId: null,
        });
      }
    });

    const albums = Array.from(albumDB.entries());
    albums.forEach(([key, artist]) => {
      if (artist.artistId === id) {
        albumDB.set(key, {
          ...artist,
          artistId: null,
        });
      }
    });

    artistDB.delete(artist.id);
    return;
  }
}
