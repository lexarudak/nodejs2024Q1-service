import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TracksModule } from 'src/track/track.module';
import { PrismaService } from 'src/prisma.service';
import { ArtistService } from 'src/artist/artist.service';
import { TracksService } from 'src/track/track.service';
import { FavsController } from './favs.controller';
import { AlbumService } from 'src/album/album.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    PrismaService,
    ArtistService,
    TracksService,
    AlbumService,
  ],
  imports: [TracksModule, AlbumModule, ArtistModule],
})
export class FavsModule {}
