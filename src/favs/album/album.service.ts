import { Injectable } from '@nestjs/common';
import { addToFav, removeFromFav } from '../helpers';
import { albumDB, favAlbumDB } from 'src/db/db';

@Injectable()
export class AlbumService {
  add(id: string) {
    return addToFav(id, albumDB, favAlbumDB, 'Album');
  }

  remove(id: string) {
    return removeFromFav(id, favAlbumDB, 'Album');
  }
}
