import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import { PaymentInput } from '../../../shared';

@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post('pay')
  @UseGuards(JwtAuthGuard)
  async initiatePayment(@Body() data: PaymentInput) {
    return this.financeService.initiatePayment(data);
  }

  @Post('verify-bank/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ACCOUNTANT)
  async verifyBank(@Param('id') id: string) {
    return this.financeService.verifyBankPayment(id);
  }

  @Get('invoices/:studentId')
  @UseGuards(JwtAuthGuard)
  async getInvoices(@Param('studentId') studentId: string) {
    return this.financeService.getStudentInvoices(studentId);
  }

  @Post('mpesa/callback')
  async mpesaCallback(@Body() payload: any) {
    return this.financeService.handleMpesaCallback(payload);
  }
}
