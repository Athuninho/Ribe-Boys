import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { PaymentInput } from '../../../shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post('fee-structure')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ACCOUNTANT)
  async createFeeStructure(@Body() data: any) {
    return this.financeService.createFeeStructure(data);
  }

  @Get('invoices/student/:studentId')
  @UseGuards(JwtAuthGuard)
  async getInvoices(@Param('studentId') studentId: string) {
    return this.financeService.getStudentInvoices(studentId);
  }

  @Post('pay')
  @UseGuards(JwtAuthGuard)
  async pay(@Body() data: PaymentInput) {
    return this.financeService.initiatePayment(data);
  }

  @Post('callback')
  async callback(@Body() payload: any) {
    return this.financeService.handleMpesaCallback(payload);
  }
}
