import { z } from 'zod';

// Roles matching the Prisma enum
export const Role = z.enum([
  'SUPER_ADMIN',
  'PRINCIPAL',
  'DEPUTY_PRINCIPAL',
  'DIRECTOR_OF_STUDIES',
  'TEACHER',
  'CLASS_TEACHER',
  'DORMITORY_MASTER',
  'ACCOUNTANT',
  'STUDENT',
  'PARENT',
]);

export type RoleType = z.infer<typeof Role>;

// CBC Level matching the Prisma enum
export const CBCLevel = z.enum([
  'EE1', 'EE2', 'ME1', 'ME2', 'AE1', 'AE2', 'BE1', 'BE2'
]);

export type CBCLevelType = z.infer<typeof CBCLevel>;

// Shared Login Schema
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// Shared User Registration Schema
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: Role.default('STUDENT'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

// Student Admission Schema
export const StudentAdmissionSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  admissionNumber: z.string(),
  upiNumber: z.string().optional(),
  dateOfBirth: z.string().or(z.date()),
  currentGrade: z.number().int().min(10).max(12),
  stream: z.string(),
  parentId: z.string().optional(),
});

export type StudentAdmissionInput = z.infer<typeof StudentAdmissionSchema>;

// CBC Assessment Schema
export const AssessmentSchema = z.object({
  studentId: z.string().uuid(),
  subjectId: z.string().uuid(),
  learningArea: z.string(),
  competency: z.string(),
  score: CBCLevel,
  remarks: z.string().optional(),
  term: z.enum(['TERM_1', 'TERM_2', 'TERM_3']),
  year: z.number().int(),
});

export type AssessmentInput = z.infer<typeof AssessmentSchema>;

// Fee Payment Schema
export const PaymentSchema = z.object({
  invoiceId: z.string().uuid(),
  studentId: z.string().uuid(),
  amount: z.number().positive(),
  method: z.enum(['MPESA', 'BANK_TRANSFER', 'CASH']),
  // M-Pesa specific
  phoneNumber: z.string().regex(/^254[0-9]{9}$/).optional(),
  // Bank specific
  bankName: z.string().optional(),
  bankBranch: z.string().optional(),
  transactionId: z.string().optional(),
  bankSlipUrl: z.string().url().optional(),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;
