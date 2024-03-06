import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  trackDB: Map<string, Track>;
  constructor() {
    this.trackDB = new Map<string, Track>();
  }

  getTrack(id: string) {
    const track = this.trackDB.get(id);
    if (!track?.id) {
      throw new NotFoundException(`Track with this id not found`);
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.trackDB.set(track.id, track);
    return track;
  }

  findAll() {
    return Array.from(this.trackDB.values());
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
    this.trackDB.set(newTrack.id, newTrack);
    return newTrack;
  }

  remove(id: string) {
    const track = this.getTrack(id);
    this.trackDB.delete(track.id);
    return;
  }
}
