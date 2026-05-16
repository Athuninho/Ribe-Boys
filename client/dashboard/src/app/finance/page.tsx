"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, CreditCard, Building2, 
  Upload, CheckCircle2, AlertCircle, ArrowRight 
} from "lucide-react";

export default function FinancePortal() {
  const [method, setMethod] = useState<'MPESA' | 'BANK' | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMpesaPay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const handleBankSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Finance & Fee Portal</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your school fees and view payment history.</p>
      </div>

      {!success ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fee Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-8 rounded-3xl bg-primary text-white">
              <p className="text-primary-foreground/80 font-medium">Total Balance Due</p>
              <h2 className="text-4xl font-bold mt-2">Ksh 45,200</h2>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Tuition Fees</span>
                  <span>Ksh 20,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Boarding Fees</span>
                  <span>Ksh 25,200</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Select Payment Method</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setMethod('MPESA')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    method === 'MPESA' ? 'border-primary bg-primary/5' : 'border-slate-50 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                      <CreditCard size={20} />
                    </div>
                    <span className="font-bold text-slate-700">M-Pesa STK Push</span>
                  </div>
                  {method === 'MPESA' && <CheckCircle2 className="text-primary" size={20} />}
                </button>

                <button 
                  onClick={() => setMethod('BANK')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    method === 'BANK' ? 'border-primary bg-primary/5' : 'border-slate-50 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                      <Building2 size={20} />
                    </div>
                    <span className="font-bold text-slate-700">Bank Deposit Slip</span>
                  </div>
                  {method === 'BANK' && <CheckCircle2 className="text-primary" size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {method === 'MPESA' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-8 rounded-3xl"
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">M-Pesa Payment</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                      <input 
                        type="text" 
                        placeholder="2547XXXXXXXX"
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amount to Pay (Ksh)</label>
                      <input 
                        type="number" 
                        defaultValue={45200}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <button 
                      onClick={handleMpesaPay}
                      disabled={loading}
                      className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-2"
                    >
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>Pay with M-Pesa</span>}
                    </button>
                  </div>
                </motion.div>
              )}

              {method === 'BANK' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-8 rounded-3xl"
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Bank Deposit Details</h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Equity Bank</p>
                      <p className="font-bold text-slate-800">Acc Name: Ribe Boys High School</p>
                      <p className="font-bold text-slate-800">Acc No: 1234567890</p>
                      <p className="text-sm text-slate-500 mt-1">Branch: Kaloleni</p>
                    </div>
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">KCB Bank</p>
                      <p className="font-bold text-slate-800">Acc Name: Ribe Boys School</p>
                      <p className="font-bold text-slate-800">Acc No: 0987654321</p>
                      <p className="text-sm text-slate-500 mt-1">Branch: Mariakani</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction Code</label>
                        <input 
                          type="text" 
                          placeholder="e.g., REF12345678"
                          className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amount Paid (Ksh)</label>
                        <input 
                          type="number" 
                          className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Deposit Slip</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
                        <Upload className="text-slate-400 mb-2" size={32} />
                        <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
                        <p className="text-[10px] text-slate-400 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleBankSubmit}
                      disabled={loading}
                      className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-2"
                    >
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>Submit for Verification</span>}
                    </button>
                  </div>
                </motion.div>
              )}

              {!method && (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <DollarSign className="text-slate-300 mb-4" size={48} />
                  <p className="text-slate-500 font-medium">Select a payment method to proceed.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass-card p-12 rounded-[40px] text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Payment Initiated!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {method === 'MPESA' 
              ? "We've sent an STK push to your phone. Please enter your M-Pesa PIN to complete the transaction."
              : "Your bank deposit slip has been submitted successfully. Our accounts department will verify the payment within 24 hours."}
          </p>
          <button 
            onClick={() => { setSuccess(false); setMethod(null); }}
            className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
          >
            Back to Portal
          </button>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
