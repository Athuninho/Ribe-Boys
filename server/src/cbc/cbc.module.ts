import { Module } from '@nestjs/common';
import { CBCService } from './cbc.service';
import { CBCController } from './cbc.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AIModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AIModule],
  providers: [CBCService],
  controllers: [CBCController],
  exports: [CBCService],
})
export class CBCModule {}
