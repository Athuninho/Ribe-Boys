import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AIService } from '../ai/ai.service';
import { AssessmentInput } from '../../../shared';

@Injectable()
export class CBCService {
  constructor(
    private prisma: PrismaService,
    private aiService: AIService,
  ) {}

  async createAssessment(data: AssessmentInput) {
    let finalRemarks = data.remarks;

    if (!finalRemarks) {
      // Fetch student and subject names for better AI context
      const student = await this.prisma.student.findUnique({
        where: { id: data.studentId },
        include: { user: true },
      });
      const subject = await this.prisma.subject.findUnique({
        where: { id: data.subjectId },
      });

      if (student && subject) {
        finalRemarks = await this.aiService.generateRemark(
          `${student.user.firstName} ${student.user.lastName}`,
          subject.name,
          data.score,
          data.competency
        );
      }
    }

    return this.prisma.competencyAssessment.create({
      data: {
        studentId: data.studentId,
        subjectId: data.subjectId,
        learningArea: data.learningArea,
        competency: data.competency,
        score: data.score,
        remarks: finalRemarks,
        term: data.term,
        year: data.year,
      },
    });
  }

  async getStudentAssessments(studentId: string, term?: any, year?: number) {
    return this.prisma.competencyAssessment.findMany({
      where: {
        studentId,
        ...(term && { term }),
        ...(year && { year }),
      },
      include: {
        subject: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getPerformanceAnalytics(studentId: string) {
    const assessments = await this.prisma.competencyAssessment.findMany({
      where: { studentId },
    });

    // Simple analytics: Count occurrences of each level
    const counts = assessments.reduce((acc, curr) => {
      acc[curr.score] = (acc[curr.score] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAssessments: assessments.length,
      distribution: counts,
    };
  }
}
