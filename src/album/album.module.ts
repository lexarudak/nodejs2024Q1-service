import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { PrismaService } from 'src/prisma.service';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService],
})
export class AlbumModule {}
