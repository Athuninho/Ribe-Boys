import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { MpesaService } from './mpesa.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CommunicationModule } from '../communication/communication.module';

@Module({
  imports: [PrismaModule, CommunicationModule],
  providers: [FinanceService, MpesaService],
  controllers: [FinanceController],
  exports: [FinanceService],
})
export class FinanceModule {}
