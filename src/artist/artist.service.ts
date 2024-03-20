import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { errorHandler, isExist } from 'src/utils/helpers';
import { Items } from 'src/utils/const';

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
    return artist;
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    isExist(artist, Items.artist);

    return artist;
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
      return updatedArtist;
    } catch (e) {
      errorHandler(e);
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
