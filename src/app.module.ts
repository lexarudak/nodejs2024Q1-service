import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TracksModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingService } from './logging/logging.service';
import { LoggingMiddleware } from './logging.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth.middleware';

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
    AuthModule,
  ],
  providers: [
    LoggingService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/signup', 'auth/login', '/doc', '/')
      .forRoutes('*');

    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
