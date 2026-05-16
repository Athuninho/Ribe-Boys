import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardingService {
  constructor(private prisma: PrismaService) {}

  async createDormitory(name: string, capacity: number, dormMasterId?: string) {
    return this.prisma.dormitory.create({
      data: { name, capacity, dormMasterId },
    });
  }

  async assignStudentToDorm(studentId: string, dormId: string, bedNumber: string) {
    const dorm = await this.prisma.dormitory.findUnique({
      where: { id: dormId },
      include: { students: true },
    });

    if (!dorm) {
      throw new NotFoundException('Dormitory not found');
    }

    if (dorm.students.length >= dorm.capacity) {
      throw new ConflictException('Dormitory is at full capacity');
    }

    return this.prisma.student.update({
      where: { id: studentId },
      data: { dormId, bedNumber },
    });
  }

  async getDormitoryStudents(dormId: string) {
    const dorm = await this.prisma.dormitory.findUnique({
      where: { id: dormId },
      include: {
        students: {
          include: {
            user: {
              select: { firstName: true, lastName: true, profileImage: true }
            }
          }
        },
        dormMaster: {
          include: { user: { select: { firstName: true, lastName: true } } }
        }
      },
    });

    if (!dorm) {
      throw new NotFoundException('Dormitory not found');
    }

    return dorm;
  }

  async recordDiscipline(studentId: string, description: string, severity: string, reportedBy: string) {
    return this.prisma.disciplineRecord.create({
      data: {
        studentId,
        description,
        severity,
        reportedBy,
      },
    });
  }

  async getOccupancyAnalytics() {
    const dorms = await this.prisma.dormitory.findMany({
      include: { _count: { select: { students: true } } },
    });

    return dorms.map(dorm => ({
      name: dorm.name,
      capacity: dorm.capacity,
      occupied: dorm._count.students,
      vacancy: dorm.capacity - dorm._count.students,
    }));
  }
}
