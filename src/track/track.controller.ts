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
import { TracksService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidIdDto } from 'src/common-dto/valid-id.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ValidIdDto) {
    return this.tracksService.findOne(id);
  }

  @Put()
  emptyUpdate() {
    throw new BadRequestException('User id must be provided');
  }

  @Put(':id')
  update(@Param() { id }: ValidIdDto, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete()
  emptyDelete() {
    throw new BadRequestException('User id must be provided');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidIdDto) {
    return this.tracksService.remove(id);
  }
}
