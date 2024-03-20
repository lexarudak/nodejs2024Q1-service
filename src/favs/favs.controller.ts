import { Controller, Get, Param, Post, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ValidIdDto } from 'src/common-dto/valid-id.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  addTrack(@Param() { id }: ValidIdDto) {
    return this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrackFromFavs(@Param() { id }: ValidIdDto) {
    return this.favsService.removeTrack(id);
  }

  @Post('/artist/:id')
  addArtist(@Param() { id }: ValidIdDto) {
    return this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtistFromFavs(@Param() { id }: ValidIdDto) {
    return this.favsService.removeArtist(id);
  }

  @Post('/album/:id')
  addAlbum(@Param() { id }: ValidIdDto) {
    return this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbumFromFavs(@Param() { id }: ValidIdDto) {
    return this.favsService.removeAlbum(id);
  }
}
