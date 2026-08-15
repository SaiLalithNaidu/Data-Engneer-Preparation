import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  isDarkMode, 
  setIsDarkMode,
  activeFilterTab, 
  setActiveFilterTab,
  onOpenPdfModal,
  onToggleMobileSidebar,
  currentUser,
  onSignOut
}) {
  const filterTabs = ['Skill-Wise', 'Company-Wise', 'Crash Courses', 'All Topics'];

  return (
    <header className={`sticky top-0 z-30 w-full border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#090e1a]/95 border-slate-800 text-slate-100 backdrop-blur-md' 
        : 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-md shadow-xs'
    }`}>
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2.5">
        
        {/* Left Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl border border-slate-700/50 hover:bg-slate-800 text-slate-300 flex-shrink-0"
            title="Open Topics Tree"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Quick Filter Pill Tabs - Horizontally Scrollable on Mobile */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl border bg-slate-100 dark:bg-slate-950 border-inherit">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilterTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilterTab === tab
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isDarkMode 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search SQL, PySpark, AWS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Right Action Icons & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          
          {/* Day / Night Theme Switcher */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Day/Night Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Profile Badge & Sign Out Button */}
          {currentUser && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-xl border text-xs font-bold ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
              }`}>
                <UserCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <div className="text-left leading-tight hidden xs:block">
                  <div className="truncate max-w-[90px] sm:max-w-[120px] font-extrabold text-[11px] sm:text-xs">{currentUser.fullName}</div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 font-mono font-medium hidden sm:block">{currentUser.targetRole}</div>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={onSignOut}
                className={`p-1.5 sm:p-2 rounded-xl border transition-all text-rose-500 hover:bg-rose-500/10 ${
                  isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'
                }`}
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
