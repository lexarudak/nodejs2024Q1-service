import { Injectable } from '@nestjs/common';
import { addToFav, removeFromFav } from '../helpers';
import { favTrackDB, trackDB } from 'src/db/db';

@Injectable()
export class TrackService {
  add(id: string) {
    return addToFav(id, trackDB, favTrackDB, 'Track');
  }

  remove(id: string) {
    return removeFromFav(id, favTrackDB, 'Track');
  }
}
