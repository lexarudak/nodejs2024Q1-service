import { Injectable } from '@nestjs/common';
import { TracksService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavsService {
  constructor(
    private trackService: TracksService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}
  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.artistService.findFavs(),
      this.albumService.findFavs(),
      this.trackService.findFavs(),
    ]);
    return { artists, albums, tracks };
  }

  async addTrack(id: string) {
    return await this.trackService.toggleFavTrack(id, true);
  }

  async removeTrack(id: string) {
    return await this.trackService.toggleFavTrack(id, false);
  }

  async addArtist(id: string) {
    return await this.artistService.toggleFavArtist(id, true);
  }

  async removeArtist(id: string) {
    return await this.artistService.toggleFavArtist(id, false);
  }

  async addAlbum(id: string) {
    return await this.albumService.toggleFavAlbum(id, true);
  }

  async removeAlbum(id: string) {
    return await this.albumService.toggleFavAlbum(id, false);
  }
}
