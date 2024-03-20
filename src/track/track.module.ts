import { Module } from '@nestjs/common';
import { TracksService } from './track.service';
import { TracksController } from './track.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
})
export class TracksModule {}
