import { Module } from '@nestjs/common';
import { TracksService } from './track.service';
import { TracksController } from './track.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
