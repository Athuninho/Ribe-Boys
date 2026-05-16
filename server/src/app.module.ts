import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { CBCModule } from './cbc/cbc.module';
import { FinanceModule } from './finance/finance.module';
import { AIModule } from './ai/ai.module';
import { CommunicationModule } from './communication/communication.module';
import { BoardingModule } from './boarding/boarding.module';
import { ExamModule } from './exam/exam.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    StudentModule,
    CBCModule,
    FinanceModule,
    AIModule,
    CommunicationModule,
    BoardingModule,
    ExamModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
