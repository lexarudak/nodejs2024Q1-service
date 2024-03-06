import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

type DBItem = Track | Album | Artist;

export const addToFav = <T extends DBItem>(
  id: string,
  db: Map<string, T>,
  favDB: Map<string, T>,
  itemName: string,
) => {
  const item = db.get(id);
  if (item) {
    favDB.set(id, item);
    return `${itemName} with id ${id} was added to favorites`;
  }

  throw new UnprocessableEntityException(
    `${itemName} with id ${id} is not exist`,
  );
};

export const removeFromFav = (
  id: string,
  db: Map<string, DBItem>,
  itemName: string,
) => {
  if (db.has(id)) {
    db.delete(id);
    return;
  }
  throw new NotFoundException(
    `${itemName} with id ${id} is not exist in favorite list`,
  );
};
