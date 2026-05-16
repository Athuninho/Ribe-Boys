import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AIService {
  private openai: OpenAI;
  private readonly logger = new Logger(AIService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('OPENAI_API_KEY');
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateRemark(studentName: string, subject: string, level: string, competency: string) {
    try {
      const prompt = `
        As a senior teacher at Ribe Boys Senior School, write a professional, constructive, and encouraging academic remark for a student.
        Student Name: ${studentName}
        Subject: ${subject}
        CBC Level: ${level} (where EE=Exceeding, ME=Meeting, AE=Approaching, BE=Below Expectations)
        Competency: ${competency}
        
        The remark should be concise (2-3 sentences), address the student directly or by name, and provide a clear recommendation for improvement if necessary.
        Format: Return only the remark text.
      `;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.choices[0].message.content?.trim();
    } catch (error) {
      this.logger.error('OpenAI Remark Generation Failed', error);
      return 'Performance is noted. Continue working hard to achieve higher competencies.';
    }
  }

  async analyzePerformanceTrends(assessments: any[]) {
    // This could use AI to summarize a student's term performance
    try {
      const summaryData = assessments.map(a => `${a.subject.name}: ${a.score}`).join(', ');
      const prompt = `Analyze these CBC assessment results for a student and provide a 3-sentence summary of their strengths and areas for growth: ${summaryData}`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
      });

      return response.choices[0].message.content?.trim();
    } catch (error) {
      this.logger.error('OpenAI Trend Analysis Failed', error);
      return 'Trends indicate consistent effort across learning areas.';
    }
  }
}
