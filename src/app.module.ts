import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TracksModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    UserModule,
    TracksModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'rs-node',
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
