import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { errorHandler, exclude, isExist } from 'src/utils/helpers';
import { ErrorCodes, Items } from 'src/utils/const';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create({ name, grammy }: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        name,
        grammy,
      },
    });
    return exclude(artist);
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();
    return artists.map(exclude);
  }

  async findFavs() {
    const artists = await this.prisma.artist.findMany({
      where: {
        favs: true,
      },
    });
    return artists.map(exclude);
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    isExist(artist, Items.artist);

    return exclude(artist);
  }

  async update(id: string, { name, grammy }: UpdateArtistDto) {
    try {
      const updatedArtist = await this.prisma.artist.update({
        where: {
          id,
        },
        data: {
          name,
          grammy,
        },
      });
      return exclude(updatedArtist);
    } catch (e) {
      errorHandler(e);
    }
  }

  async toggleFavArtist(id: string, favs: boolean) {
    try {
      const artist = await this.prisma.artist.update({
        where: {
          id,
        },
        data: {
          favs,
        },
      });
      return exclude(artist);
    } catch (e) {
      errorHandler(e, ErrorCodes.unprocessable);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.artist.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      errorHandler(e);
    }
  }
}
