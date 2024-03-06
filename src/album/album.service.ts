import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { albumDB, trackDB } from 'src/db/db';

@Injectable()
export class AlbumService {
  getAlbum(id: string) {
    const album = albumDB.get(id);
    if (!album?.id) {
      throw new NotFoundException(`Album with this id not found`);
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    albumDB.set(album.id, album);
    return album;
  }

  findAll() {
    return Array.from(albumDB.values());
  }

  findOne(id: string) {
    return this.getAlbum(id);
  }

  update(
    id: string,
    { name: newName, year: newYear, artistId: newArtistId }: UpdateAlbumDto,
  ) {
    const { name, year, artistId } = this.getAlbum(id);
    const newAlbum = {
      id,
      name: newName || name,
      year: newYear === undefined ? year : newYear,
      artistId: newArtistId === undefined ? artistId : newArtistId,
    };
    albumDB.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  remove(id: string) {
    const album = this.getAlbum(id);
    const tracks = Array.from(trackDB.entries());
    tracks.forEach(([key, track]) => {
      if (track.albumId === id) {
        trackDB.set(key, {
          ...track,
          albumId: null,
        });
      }
    });
    albumDB.delete(album.id);
    return;
  }
}
