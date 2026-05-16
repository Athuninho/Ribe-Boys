"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Search } from "lucide-react";

const downloads = [
  { id: 1, title: "Admission Form 2024", category: "Admissions", size: "2.4 MB", type: "PDF" },
  { id: 2, title: "Fee Structure (National Schools Cluster III)", category: "Fees", size: "1.1 MB", type: "PDF" },
  { id: 3, title: "School Rules & Regulations", category: "Policy", size: "850 KB", type: "PDF" },
  { id: 4, title: "Term 2 Academic Calendar", category: "Academic", size: "1.5 MB", type: "PDF" },
  { id: 5, title: "Holiday Assignment - Grade 10", category: "Academic", size: "3.2 MB", type: "PDF" },
  { id: 6, title: "Joining Instructions", category: "Admissions", size: "1.8 MB", type: "PDF" },
];

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDownloads = downloads.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20 bg-accent/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">Downloads Portal</h1>
          <p className="text-gray-600 text-lg">Access essential school documents and forms.</p>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input 
            type="text" 
            placeholder="Search for forms, fee structures, or policies..."
            className="w-full pl-16 pr-8 py-6 rounded-3xl border-none shadow-xl focus:ring-2 focus:ring-secondary outline-none text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6">
          {filteredDownloads.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item.id}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row items-center justify-between border border-white group"
            >
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="p-4 bg-primary/5 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <FileText size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">{item.category}</span>
                    <span className="text-xs text-gray-400">{item.type} • {item.size}</span>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 px-8 py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                <Download size={20} />
                <span>Download Now</span>
              </button>
            </motion.div>
          ))}
          
          {filteredDownloads.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium text-lg">No documents found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
