import {
  Controller,
  Post,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ValidIdDto } from 'src/common-dto/valid-id.dto';

@Controller('favs/artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  emptyAdd() {
    throw new BadRequestException('Artist id must be provided');
  }

  @Post(':id')
  add(@Param() { id }: ValidIdDto) {
    return this.artistService.add(id);
  }

  @Delete()
  emptyRemove() {
    throw new BadRequestException('Artist id must be provided');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidIdDto) {
    return this.artistService.remove(id);
  }
}
