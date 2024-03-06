import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TracksModule } from './track/track.module';
import { ArtistsModule } from './artists/artists.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, TracksModule, ArtistsModule, ArtistModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
