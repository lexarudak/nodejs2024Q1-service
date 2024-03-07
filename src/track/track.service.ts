import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { favTrackDB, trackDB } from 'src/db/db';

@Injectable()
export class TracksService {
  getTrack(id: string) {
    const track = trackDB.get(id);
    if (!track?.id) {
      throw new NotFoundException(`Track with this id not found`);
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    trackDB.set(track.id, track);
    return track;
  }

  findAll() {
    return Array.from(trackDB.values());
  }

  findOne(id: string) {
    return this.getTrack(id);
  }

  update(
    id: string,
    {
      name: newName,
      duration: newDuration,
      artistId: newArtistId,
      albumId: newAlbumId,
    }: UpdateTrackDto,
  ) {
    const { name, duration, albumId, artistId } = this.getTrack(id);
    const newTrack = {
      id,
      name: newName || name,
      duration: newDuration || duration,
      artistId: artistId === undefined ? artistId : newArtistId,
      albumId: albumId === undefined ? albumId : newAlbumId,
    };
    trackDB.set(newTrack.id, newTrack);
    return newTrack;
  }

  remove(id: string) {
    this.getTrack(id);
    trackDB.delete(id);
    favTrackDB.delete(id);
    return;
  }
}
