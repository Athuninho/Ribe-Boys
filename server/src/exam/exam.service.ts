import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async createExam(data: { name: string; term: any; year: number; startDate: Date; endDate: Date }) {
    return this.prisma.exam.create({ data });
  }

  async recordResult(data: { examId: string; studentId: string; subjectId: string; marks: number; remarks?: string }) {
    const grade = this.calculateGrade(data.marks);
    
    return this.prisma.examResult.upsert({
      where: {
        examId_studentId_subjectId: {
          examId: data.examId,
          studentId: data.studentId,
          subjectId: data.subjectId,
        },
      },
      update: { marks: data.marks, grade, remarks: data.remarks },
      create: { ...data, grade },
    });
  }

  private calculateGrade(marks: number): string {
    if (marks >= 80) return 'A';
    if (marks >= 75) return 'A-';
    if (marks >= 70) return 'B+';
    if (marks >= 65) return 'B';
    if (marks >= 60) return 'B-';
    if (marks >= 55) return 'C+';
    if (marks >= 50) return 'C';
    if (marks >= 45) return 'C-';
    if (marks >= 40) return 'D+';
    if (marks >= 35) return 'D';
    if (marks >= 30) return 'D-';
    return 'E';
  }

  async getStudentReport(studentId: string, examId: string) {
    const results = await this.prisma.examResult.findMany({
      where: { studentId, examId },
      include: { subject: true, exam: true },
    });

    if (results.length === 0) {
      throw new NotFoundException('No results found for this student and exam');
    }

    const totalMarks = results.reduce((acc, curr) => acc + curr.marks, 0);
    const meanScore = totalMarks / results.length;

    return {
      results,
      summary: {
        totalMarks,
        meanScore,
        meanGrade: this.calculateGrade(meanScore),
      },
    };
  }

  async getExamAnalytics(examId: string) {
    const results = await this.prisma.examResult.findMany({
      where: { examId },
    });

    const gradeDistribution = results.reduce((acc, curr) => {
      acc[curr.grade || 'U'] = (acc[curr.grade || 'U'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalStudents: new Set(results.map(r => r.studentId)).size,
      gradeDistribution,
    };
  }
}
