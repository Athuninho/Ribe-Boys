import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ExamService } from './exam.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('exams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamController {
  constructor(private examService: ExamService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.DIRECTOR_OF_STUDIES)
  async create(@Body() data: any) {
    return this.examService.createExam(data);
  }

  @Post('record')
  @Roles(Role.TEACHER, Role.CLASS_TEACHER, Role.SUPER_ADMIN)
  async record(@Body() data: any) {
    return this.examService.recordResult(data);
  }

  @Get('report/:studentId/:examId')
  async getReport(@Param('studentId') studentId: string, @Param('examId') examId: string) {
    return this.examService.getStudentReport(studentId, examId);
  }

  @Get('analytics/:examId')
  @Roles(Role.SUPER_ADMIN, Role.PRINCIPAL, Role.DIRECTOR_OF_STUDIES)
  async getAnalytics(@Param('examId') examId: string) {
    return this.examService.getExamAnalytics(examId);
  }
}
