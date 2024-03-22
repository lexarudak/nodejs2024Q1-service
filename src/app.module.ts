import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TracksModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TracksModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
