import { Injectable } from '@nestjs/common';
import { favAlbumDB, favArtistDB, favTrackDB } from 'src/db/db';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  findAll() {
    const fav: Fav = {
      artists: Array.from(favArtistDB.values()),
      albums: Array.from(favAlbumDB.values()),
      tracks: Array.from(favTrackDB.values()),
    };
    return fav;
  }
}
