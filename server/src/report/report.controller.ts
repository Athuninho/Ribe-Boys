import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('report-card/:studentId/:examId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.PRINCIPAL, Role.TEACHER, Role.PARENT, Role.STUDENT)
  async downloadReportCard(
    @Param('studentId') studentId: string,
    @Param('examId') examId: string,
    @Res() res: Response,
  ) {
    const buffer = await this.reportService.generateReportCard(studentId, examId);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=Report_Card_${studentId}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
