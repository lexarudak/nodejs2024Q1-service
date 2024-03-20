import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma.service';
import { errorHandler, isExist } from 'src/utils/helpers';
import { Items } from 'src/utils/const';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create({ name, duration, artistId, albumId }: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: {
        name,
        duration,
        artistId: artistId || null,
        albumId: albumId || null,
      },
    });
    return track;
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    isExist(track, Items.track);

    return track;
  }

  async update(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ) {
    try {
      const updatedTrack = await this.prisma.track.update({
        where: {
          id,
        },
        data: {
          name,
          duration,
          albumId,
          artistId,
        },
      });
      return updatedTrack;
    } catch (e) {
      errorHandler(e);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.track.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      errorHandler(e);
    }
  }
}
