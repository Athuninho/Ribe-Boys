"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentGrade: "10",
    previousSchool: "",
    kcpeMarks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted successfully! We will contact you soon.");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-accent/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">Online Admissions</h1>
          <p className="text-gray-600 text-lg">Join the legacy of excellence at Ribe Boys Senior School.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-accent"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase">First Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-0 transition-all"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase">Last Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-0 transition-all"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-0 transition-all"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary uppercase">Applying for Grade</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-0 transition-all"
                value={formData.currentGrade}
                onChange={(e) => setFormData({...formData, currentGrade: e.target.value})}
              >
                <option value="10">Grade 10 (Senior School Entry)</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-primary uppercase">Previous School</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-0 transition-all"
                required
                value={formData.previousSchool}
                onChange={(e) => setFormData({...formData, previousSchool: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit"
                className="w-full py-4 gold-gradient text-primary font-bold rounded-xl hover:shadow-xl transition-all transform active:scale-[0.98]"
              >
                Submit Application
              </button>
            </div>
          </form>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl border border-accent">
            <h3 className="font-bold text-primary mb-2">Requirements</h3>
            <p className="text-sm text-gray-500">KCPE/Assessment results, Birth Certificate, and Transfer Letter.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-accent">
            <h3 className="font-bold text-primary mb-2">Processing Time</h3>
            <p className="text-sm text-gray-500">Applications are reviewed within 48 hours of submission.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-accent">
            <h3 className="font-bold text-primary mb-2">Need Help?</h3>
            <p className="text-sm text-gray-500">Call: 0726123088 or 0727559646</p>
          </div>
        </div>
      </div>
    </div>
  );
}
