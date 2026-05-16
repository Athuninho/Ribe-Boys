import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentAdmissionInput } from '../../../shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // I need to create this
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('admit')
  @Roles(Role.SUPER_ADMIN, Role.PRINCIPAL, Role.DIRECTOR_OF_STUDIES)
  async admit(@Body() data: StudentAdmissionInput) {
    return this.studentService.admitStudent(data);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.PRINCIPAL, Role.TEACHER, Role.ACCOUNTANT)
  async findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }
}
