import {
  Controller,
  Post,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { ValidIdDto } from 'src/common-dto/valid-id.dto';

@Controller('favs/album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  emptyAdd() {
    throw new BadRequestException('Track id must be provided');
  }

  @Post(':id')
  add(@Param() { id }: ValidIdDto) {
    return this.albumService.add(id);
  }

  @Delete()
  emptyRemove() {
    throw new BadRequestException('Track id must be provided');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidIdDto) {
    return this.albumService.remove(id);
  }
}
