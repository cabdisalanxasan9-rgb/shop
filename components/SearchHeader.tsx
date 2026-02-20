"use client";

import React from "react";
import { Search, Bell } from "lucide-react";

export default function SearchHeader() {
  return (
    <header className="px-6 pt-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L21 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L3 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-primary font-outfit">VeggieFresh</h1>
        </div>
        <button className="relative w-11 h-11 bg-card rounded-full flex items-center justify-center premium-shadow group">
          <Bell size={20} className="text-foreground group-hover:text-primary transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary border-2 border-background rounded-full"></span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-subtitle" />
        </div>
        <input
          type="text"
          placeholder="Search for fresh vegetables..."
          className="w-full h-14 pl-12 pr-4 bg-card rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all premium-shadow"
        />
      </div>
    </header>
  );
}
