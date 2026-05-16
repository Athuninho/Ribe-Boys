"use client";

import { 
  LayoutDashboard, Users, GraduationCap, DollarSign, 
  Settings, LogOut, Bell, Search, Menu, X,
  FileText, Calendar, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Student Management', href: '/students' },
  { icon: GraduationCap, label: 'CBC Academics', href: '/cbc' },
  { icon: DollarSign, label: 'Finance & Fees', href: '/finance' },
  { icon: FileText, label: 'Examinations', href: '/exams' },
  { icon: Calendar, label: 'Timetable', href: '/timetable' },
  { icon: ShieldCheck, label: 'Discipline', href: '/discipline' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-72 sidebar-glass transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
              R
            </div>
            <div className="font-bold text-primary leading-tight">
              RIBE BOYS <br /> <span className="text-[10px] text-slate-400 font-medium tracking-[0.2em] uppercase">Senior School</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2 overflow-y-auto h-[calc(100vh-160px)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                }`}
              >
                <item.icon className={`mr-4 ${isActive ? 'text-white' : 'group-hover:text-primary'}`} size={20} />
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <button className="flex items-center w-full px-4 py-3 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-xl transition-all">
            <LogOut size={20} className="mr-4" />
            Sign Out
          </button>
        </div>
      </div>
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-lg shadow-lg border border-slate-100"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
}
