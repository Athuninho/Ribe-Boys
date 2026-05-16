"use client";

import { Bell, Search, User } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-20 glass border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="relative w-96 max-w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search students, transactions, records..."
          className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-100"></div>

        <div className="flex items-center space-x-4 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">Admin User</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">Super Administrator</p>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-600">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
