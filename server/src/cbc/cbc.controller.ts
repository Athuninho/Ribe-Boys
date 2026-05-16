import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CBCService } from './cbc.service';
import { AssessmentInput } from '../../../shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('cbc')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CBCController {
  constructor(private cbcService: CBCService) {}

  @Post('assessments')
  @Roles(Role.TEACHER, Role.CLASS_TEACHER, Role.SUPER_ADMIN)
  async create(@Body() data: AssessmentInput) {
    return this.cbcService.createAssessment(data);
  }

  @Get('student/:studentId')
  async getStudentAssessments(
    @Param('studentId') studentId: string,
    @Query('term') term: string,
    @Query('year') year: string,
  ) {
    return this.cbcService.getStudentAssessments(
      studentId,
      term as any,
      year ? parseInt(year) : undefined,
    );
  }

  @Get('analytics/:studentId')
  async getAnalytics(@Param('studentId') studentId: string) {
    return this.cbcService.getPerformanceAnalytics(studentId);
  }
}
