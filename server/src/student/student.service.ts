import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StudentAdmissionInput } from '../../../shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async admitStudent(data: StudentAdmissionInput) {
    // 1. Check if admission number or email exists
    const existingStudent = await this.prisma.student.findUnique({
      where: { admissionNumber: data.admissionNumber },
    });

    if (existingStudent) {
      throw new ConflictException('Admission number already exists');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // 2. Create User account for student
    const hashedPassword = await bcrypt.hash(data.admissionNumber, 10); // Default password is admission number
    
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'STUDENT',
        },
      });

      // 3. Create Student profile
      const student = await tx.student.create({
        data: {
          userId: user.id,
          admissionNumber: data.admissionNumber,
          upiNumber: data.upiNumber,
          dateOfBirth: new Date(data.dateOfBirth),
          currentGrade: data.currentGrade,
          parentId: data.parentId,
        },
      });

      return { user, student };
    });
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        class: true,
        dorm: true,
      },
    });
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        class: true,
        dorm: true,
        parent: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }
}
