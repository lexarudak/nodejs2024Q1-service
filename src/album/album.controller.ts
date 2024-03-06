import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ValidIdDto } from 'src/common-dto/valid-id.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ValidIdDto) {
    return this.albumService.findOne(id);
  }

  @Put()
  emptyUpdate() {
    throw new BadRequestException('Album id must be provided');
  }

  @Put(':id')
  update(@Param() { id }: ValidIdDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete()
  emptyDelete() {
    throw new BadRequestException('Album id must be provided');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidIdDto) {
    return this.albumService.remove(id);
  }
}
