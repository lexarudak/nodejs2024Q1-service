import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';
import { errorHandler, isExist } from 'src/utils/helpers';
import { Items } from 'src/utils/const';
@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create({ name, year, artistId }: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
    return album;
  }

  async findAll() {
    const album = await this.prisma.album.findMany();
    return album;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    isExist(album, Items.album);

    return album;
  }

  async update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    try {
      const updatedArtist = await this.prisma.album.update({
        where: {
          id,
        },
        data: {
          name,
          year,
          artistId,
        },
      });
      return updatedArtist;
    } catch (e) {
      errorHandler(e);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      errorHandler(e);
    }
  }
}
