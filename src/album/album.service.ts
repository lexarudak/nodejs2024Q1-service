import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';
import { errorHandler, exclude, isExist } from 'src/utils/helpers';
import { ErrorCodes, Items } from 'src/utils/const';
@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create({ name, year, artistId }: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        name,
        year,
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
    });
    return exclude(album);
  }

  async findAll() {
    const album = await this.prisma.album.findMany();
    return album.map(exclude);
  }

  async findFavs() {
    const album = await this.prisma.album.findMany({ where: { favs: true } });
    return album.map(exclude);
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    isExist(album, Items.album);

    return exclude(album);
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
          artist: artistId ? { connect: { id: artistId } } : undefined,
        },
      });
      return exclude(updatedArtist);
    } catch (e) {
      errorHandler(e);
    }
  }

  async toggleFavAlbum(id: string, favs: boolean) {
    try {
      const updatedAlbum = await this.prisma.album.update({
        where: {
          id,
        },
        data: {
          favs,
        },
      });
      return exclude(updatedAlbum);
    } catch (e) {
      return errorHandler(e, ErrorCodes.unprocessable);
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
