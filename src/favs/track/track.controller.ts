import {
  Controller,
  Post,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { ValidIdDto } from 'src/common-dto/valid-id.dto';

@Controller('favs/track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  emptyAdd() {
    throw new BadRequestException('Track id must be provided');
  }

  @Post(':id')
  add(@Param() { id }: ValidIdDto) {
    return this.trackService.add(id);
  }

  @Delete()
  emptyRemove() {
    throw new BadRequestException('Track id must be provided');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidIdDto) {
    return this.trackService.remove(id);
  }
}
