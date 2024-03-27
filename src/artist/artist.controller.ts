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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ValidIdDto } from 'src/common-dto/valid-id.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ValidIdDto) {
    return this.artistService.findOne(id);
  }

  @Put()
  emptyUpdate() {
    throw new BadRequestException('Artist id must be provided');
  }

  @Put(':id')
  update(
    @Param() { id }: ValidIdDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete()
  emptyDelete() {
    throw new BadRequestException('Artist id must be provided');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidIdDto) {
    return this.artistService.remove(id);
  }
}
