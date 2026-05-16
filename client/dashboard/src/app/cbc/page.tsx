"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Save, GraduationCap, Award } from "lucide-react";

const mockStudents = [
  { id: "1", name: "John Doe", adm: "ADM/4501", grade: "10", stream: "A" },
  { id: "2", name: "Peter Kamau", adm: "ADM/4502", grade: "10", stream: "A" },
  { id: "3", name: "David Mutua", adm: "ADM/4503", grade: "10", stream: "A" },
];

export default function CBCGradeEntry() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Assessment saved successfully!");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">CBC Grade Entry</h1>
        <p className="text-slate-500 mt-2 font-medium">Record competency-based assessments for your learning areas.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Student List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search student..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
            {mockStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`w-full text-left p-6 border-b border-slate-50 last:border-0 transition-all ${
                  selectedStudent === student.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-slate-50'
                }`}
              >
                <p className="font-bold text-slate-800">{student.name}</p>
                <p className="text-xs text-slate-500 mt-1">{student.adm} • Grade {student.grade}{student.stream}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Assessment Form */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-slate-100">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">New Assessment</h2>
                  <p className="text-slate-500">Student: {mockStudents.find(s => s.id === selectedStudent)?.name}</p>
                </div>
              </div>

              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Learning Area</label>
                    <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Mathematics</option>
                      <option>English Language</option>
                      <option>Biology (Pure Science)</option>
                      <option>Chemistry (Pure Science)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">CBC Score</label>
                    <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="EE1">EE1 - Exceeding Expectations (Level 1)</option>
                      <option value="EE2">EE2 - Exceeding Expectations (Level 2)</option>
                      <option value="ME1">ME1 - Meeting Expectations (Level 1)</option>
                      <option value="ME2">ME2 - Meeting Expectations (Level 2)</option>
                      <option value="AE1">AE1 - Approaching Expectations (Level 1)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specific Competency</label>
                  <textarea 
                    rows={2}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., Solving quadratic equations independently..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teacher Remarks</label>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold">AI ENABLED</span>
                  </div>
                  <textarea 
                    rows={3}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Leave blank for AI-generated professional remarks based on student performance..."
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-2 px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>Save Assessment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <Award className="text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">Select a student from the list to record grades.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
