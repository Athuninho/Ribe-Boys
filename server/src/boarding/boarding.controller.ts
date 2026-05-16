import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { BoardingService } from './boarding.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('boarding')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BoardingController {
  constructor(private boardingService: BoardingService) {}

  @Post('dormitories')
  @Roles(Role.SUPER_ADMIN, Role.PRINCIPAL)
  async createDorm(@Body() data: { name: string; capacity: number; dormMasterId?: string }) {
    return this.boardingService.createDormitory(data.name, data.capacity, data.dormMasterId);
  }

  @Post('assign')
  @Roles(Role.SUPER_ADMIN, Role.DORMITORY_MASTER)
  async assign(@Body() data: { studentId: string; dormId: string; bedNumber: string }) {
    return this.boardingService.assignStudentToDorm(data.studentId, data.dormId, data.bedNumber);
  }

  @Get('dormitories/:id')
  async getDorm(@Param('id') id: string) {
    return this.boardingService.getDormitoryStudents(id);
  }

  @Get('analytics/occupancy')
  @Roles(Role.SUPER_ADMIN, Role.PRINCIPAL, Role.DEPUTY_PRINCIPAL)
  async getAnalytics() {
    return this.boardingService.getOccupancyAnalytics();
  }

  @Post('discipline')
  @Roles(Role.TEACHER, Role.DORMITORY_MASTER, Role.DEPUTY_PRINCIPAL)
  async reportDiscipline(@Body() data: { studentId: string; description: string; severity: string; reportedBy: string }) {
    return this.boardingService.recordDiscipline(data.studentId, data.description, data.severity, data.reportedBy);
  }
}
