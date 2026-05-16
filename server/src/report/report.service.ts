import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);

  constructor(private prisma: PrismaService) {}

  async generateReportCard(studentId: string, examId: string): Promise<Buffer> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true, class: true },
    });

    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });

    const results = await this.prisma.examResult.findMany({
      where: { studentId, examId },
      include: { subject: true },
    });

    if (!student || !exam) {
      throw new Error('Student or Exam not found');
    }

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Header
      doc.fillColor('#003366').fontSize(20).text('RIBE BOYS SENIOR SCHOOL', { align: 'center' });
      doc.fontSize(10).text('P.O. Box 198 - 80105, Kaloleni | Email: ribeboys@gmail.com', { align: 'center' });
      doc.moveDown();
      doc.text('“Pamoja Tutashinda”', { align: 'center', oblique: true });
      doc.moveDown();
      doc.rect(50, 110, 495, 2).fill('#FFD700');
      doc.moveDown(2);

      // Student Info
      doc.fillColor('#000000').fontSize(14).text('OFFICIAL ACADEMIC REPORT CARD', { align: 'center', underline: true });
      doc.moveDown();
      
      const startY = doc.y;
      doc.fontSize(10).text(`Name: ${student.user.firstName} ${student.user.lastName}`, 50, startY);
      doc.text(`Adm No: ${student.admissionNumber}`, 350, startY);
      doc.text(`Grade: ${student.currentGrade}${student.class?.stream || ''}`, 50, startY + 15);
      doc.text(`Exam: ${exam.name} (${exam.year})`, 350, startY + 15);
      doc.moveDown(3);

      // Table Header
      const tableTop = doc.y;
      doc.rect(50, tableTop, 495, 20).fill('#003366');
      doc.fillColor('#ffffff').text('Subject', 60, tableTop + 5);
      doc.text('Marks', 250, tableTop + 5);
      doc.text('Grade', 350, tableTop + 5);
      doc.text('Remarks', 420, tableTop + 5);

      // Table Content
      let currentY = tableTop + 20;
      doc.fillColor('#000000');
      
      results.forEach((res, i) => {
        if (i % 2 === 0) {
          doc.rect(50, currentY, 495, 20).fill('#f8fafc');
          doc.fillColor('#000000');
        }
        
        doc.text(res.subject.name, 60, currentY + 5);
        doc.text(res.marks.toString(), 250, currentY + 5);
        doc.text(res.grade || '-', 350, currentY + 5);
        doc.text(res.remarks || '-', 420, currentY + 5);
        
        currentY += 20;
      });

      // Summary
      doc.moveDown(2);
      const totalMarks = results.reduce((acc, curr) => acc + curr.marks, 0);
      const avg = totalMarks / results.length;
      
      doc.fontSize(12).text(`Total Marks: ${totalMarks}`, 50);
      doc.text(`Mean Score: ${avg.toFixed(2)}`, 50);
      doc.text(`Mean Grade: ${this.calculateGrade(avg)}`, 50);

      // Signatures
      doc.moveDown(4);
      const sigY = doc.y;
      doc.text('______________________', 50, sigY);
      doc.text('Class Teacher', 50, sigY + 15);
      doc.text('______________________', 350, sigY);
      doc.text('Principal / Rubber Stamp', 350, sigY + 15);

      doc.end();
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
}
