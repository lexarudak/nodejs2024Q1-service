import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from './track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TrackModule],
})
export class FavsModule {}
