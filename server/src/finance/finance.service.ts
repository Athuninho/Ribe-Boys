import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MpesaService } from './mpesa.service';
import { CommunicationService } from '../communication/communication.service';
import { PaymentInput } from '../../../shared';

@Injectable()
export class FinanceService {
  constructor(
    private prisma: PrismaService,
    private mpesaService: MpesaService,
    private commsService: CommunicationService,
  ) {}

  async createFeeStructure(data: any) {
    return this.prisma.feeStructure.create({ data });
  }

  async getStudentInvoices(studentId: string) {
    return this.prisma.invoice.findMany({
      where: { studentId },
      include: { feeStructure: true, payments: true },
    });
  }

  async initiatePayment(data: PaymentInput) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: data.invoiceId },
      include: { student: { include: { user: true } } },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (data.method === 'MPESA') {
      if (!data.phoneNumber) {
        throw new Error('Phone number is required for M-Pesa payments');
      }
      // Initiate M-Pesa STK Push
      const response = await this.mpesaService.initiateStkPush(
        data.phoneNumber,
        data.amount,
        invoice.student.admissionNumber,
      );

      return {
        message: 'STK Push initiated. Please check your phone.',
        merchantRequestId: response.MerchantRequestID,
        checkoutRequestId: response.CheckoutRequestID,
      };
    } else if (data.method === 'BANK_TRANSFER') {
      // Create a pending bank payment
      const payment = await this.prisma.payment.create({
        data: {
          invoiceId: data.invoiceId,
          studentId: data.studentId,
          amount: data.amount,
          method: 'BANK_TRANSFER',
          transactionId: data.transactionId || `BANK-${Date.now()}`,
          bankName: data.bankName,
          bankBranch: data.bankBranch,
          bankSlipUrl: data.bankSlipUrl,
          status: 'PENDING',
        },
      });

      return {
        message: 'Bank payment record created. Please wait for verification.',
        paymentId: payment.id,
      };
    }
  }

  async verifyBankPayment(paymentId: string) {
    const payment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'COMPLETED' },
      include: { student: { include: { user: true } } },
    });

    // Update invoice balance
    await this.prisma.invoice.update({
      where: { id: payment.invoiceId },
      data: {
        paidAmount: { increment: payment.amount },
        balance: { decrement: payment.amount },
      },
    });

    // Send SMS notification
    if (payment.student.user.phoneNumber) {
      try {
        await this.commsService.sendSMS(
          payment.student.user.phoneNumber,
          `RIBE BOYS: Bank payment of Ksh ${payment.amount} has been verified. Thank you.`
        );
      } catch (err) {
        console.error('Failed to send verification SMS', err);
      }
    }

    return payment;
  }

  async handleMpesaCallback(payload: any) {
    const { Body } = payload;
    const { stkCallback } = Body;

    if (stkCallback.ResultCode === 0) {
      // Success
      const metadata = stkCallback.CallbackMetadata.Item;
      const amount = metadata.find((i: any) => i.Name === 'Amount').Value;
      const receipt = metadata.find((i: any) => i.Name === 'MpesaReceiptNumber').Value;
      const phone = metadata.find((i: any) => i.Name === 'PhoneNumber').Value;
      
      // Update database (This would need to map CheckoutRequestID to the invoice)
      // For now, logging success
      console.log(`Payment successful: ${receipt}, Amount: ${amount}`);

      // Send SMS notification
      try {
        await this.commsService.sendSMS(
          phone,
          `RIBE BOYS: Payment of Ksh ${amount} received. Receipt: ${receipt}. Thank you for your support.`
        );
      } catch (err) {
        console.error('Failed to send payment SMS', err);
      }
    } else {
      console.log(`Payment failed: ${stkCallback.ResultDesc}`);
    }

    return { status: 'success' };
  }
}
