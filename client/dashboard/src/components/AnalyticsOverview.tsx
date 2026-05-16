"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  Users, TrendingUp, DollarSign, Award, 
  ArrowUpRight, ArrowDownRight, GraduationCap 
} from 'lucide-react';
import { motion } from 'framer-motion';

const studentData = [
  { name: 'Grade 10', students: 310, stem: 120, arts: 90, social: 100 },
  { name: 'Grade 11', students: 280, stem: 110, arts: 80, social: 90 },
  { name: 'Grade 12', students: 245, stem: 105, arts: 70, social: 70 },
];

const feeTrends = [
  { month: 'Jan', collection: 4.5 },
  { month: 'Feb', collection: 5.2 },
  { month: 'Mar', collection: 3.8 },
  { month: 'Apr', collection: 6.1 },
  { month: 'May', collection: 5.9 },
];

const cbcPerformance = [
  { name: 'Exceeding (EE)', value: 25, color: '#003366' },
  { name: 'Meeting (ME)', value: 45, color: '#3b82f6' },
  { name: 'Approaching (AE)', value: 20, color: '#FFD700' },
  { name: 'Below (BE)', value: 10, color: '#ef4444' },
];

const COLORS = ['#003366', '#3b82f6', '#FFD700', '#ef4444'];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-8">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '835', icon: Users, change: '+12%', positive: true },
          { label: 'Fee Collection', value: 'Ksh 12.4M', icon: DollarSign, change: '+5.4%', positive: true },
          { label: 'Avg Performance', value: '6.95 B-', icon: Award, change: '+2.1%', positive: true },
          { label: 'Active Teachers', value: '42', icon: GraduationCap, change: '0%', positive: true },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className={`flex items-center mt-2 text-xs font-bold ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.positive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                  {stat.change}
                  <span className="text-slate-400 font-normal ml-1 text-[10px]">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <stat.icon size={24} />
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Enrollment Chart */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Enrollment by Grade & Pathway</h3>
            <select className="bg-slate-100 border-none rounded-lg text-xs font-bold px-3 py-2 outline-none">
              <option>2024 Academic Year</option>
              <option>2023 Academic Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="stem" stackId="a" fill="#003366" radius={[0, 0, 0, 0]} barSize={40} name="STEM" />
                <Bar dataKey="arts" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={40} name="Arts" />
                <Bar dataKey="social" stackId="a" fill="#FFD700" radius={[4, 4, 0, 0]} barSize={40} name="Social Sciences" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Trend */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Fee Collection Trend (Million Ksh)</h3>
            <div className="flex space-x-2">
              <div className="flex items-center text-[10px] text-slate-500">
                <div className="w-2 h-2 rounded-full bg-primary mr-1"></div>
                Target
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeTrends}>
                <defs>
                  <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003366" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="collection" 
                  stroke="#003366" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorColl)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CBC Performance Distribution */}
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-slate-800 mb-8">CBC Performance Distribution</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-[250px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cbcPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {cbcPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {cbcPerformance.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                    <span className="text-sm font-medium text-slate-600">{p.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity / Announcements */}
        <div className="glass-card p-8 rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">System Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[
              { title: 'New Admissions', detail: '12 new students joined Grade 10', time: '2 hours ago', icon: Users, color: 'bg-blue-500' },
              { title: 'Fee Payment', detail: 'Ksh 45,000 paid for ADM/4502', time: '4 hours ago', icon: DollarSign, color: 'bg-emerald-500' },
              { title: 'CBC Assessment', detail: 'Math assessments published for Grade 11', time: 'Yesterday', icon: Award, color: 'bg-amber-500' },
              { title: 'Dorm Update', detail: 'Bed allocation completed for Kilele House', time: '2 days ago', icon: GraduationCap, color: 'bg-indigo-500' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start space-x-4 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg text-white ${activity.color}`}>
                  <activity.icon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{activity.detail}</p>
                  <p className="text-[10px] text-slate-400 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
