import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma.service';
import { errorHandler, exclude, isExist } from 'src/utils/helpers';
import { ErrorCodes, Items } from 'src/utils/const';

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
    return exclude(track);
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks.map(exclude);
  }

  async findFavs() {
    const tracks = await this.prisma.track.findMany({
      where: {
        favs: true,
      },
    });
    return tracks.map(exclude);
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    isExist(track, Items.track);

    return exclude(track);
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
      return exclude(updatedTrack);
    } catch (e) {
      errorHandler(e);
    }
  }

  async toggleFavTrack(id: string, favs: boolean) {
    try {
      const updatedTrack = await this.prisma.track.update({
        where: {
          id,
        },
        data: {
          favs,
        },
      });
      return exclude(updatedTrack);
    } catch (e) {
      errorHandler(e, ErrorCodes.unprocessable);
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
