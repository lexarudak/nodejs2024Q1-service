import { Injectable } from '@nestjs/common';
import { addToFav, removeFromFav } from '../helpers';
import { artistDB, favArtistDB } from 'src/db/db';

@Injectable()
export class ArtistService {
  add(id: string) {
    return addToFav(id, artistDB, favArtistDB, 'Artist');
  }

  remove(id: string) {
    return removeFromFav(id, favArtistDB, 'Artist');
  }
}
