import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Flame, 
  FileText, 
  Award,
  Sparkles,
  User,
  Sliders,
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
        ? 'bg-[#060b13]/90 border-slate-800 backdrop-blur-md text-slate-100' 
        : 'bg-white/90 border-slate-200 backdrop-blur-md text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Sub-header Filter Tabs (Skill-Wise, Company-Wise, Crash Courses) matching reference Image 3 */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {filterTabs.map(tab => {
              const isActive = activeFilterTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? isDarkMode
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-700 shadow-sm'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                      : isDarkMode
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Right Side: Search + Day/Night Toggle + User Profile Avatar */}
          <div className="flex items-center gap-3">
        
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl border border-inherit text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Filter Navigation Tabs matching NxtWave Reference Image 1 */}
            
            {/* Global Search input */}
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search SQL, PySpark, Snowflake..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
                }`}
              />
            </div>

            {/* Day / Night Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Day/Night Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* User Profile Badge & Sign Out Button */}
            {currentUser && (
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                }`}>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <div className="text-left leading-tight hidden sm:block">
                    <div className="truncate max-w-[120px] font-extrabold">{currentUser.fullName}</div>
                    <div className="text-[9px] text-slate-400 font-mono font-medium">{currentUser.targetRole}</div>
                  </div>
                </div>

                <button
                  onClick={onSignOut}
                  className={`p-2 rounded-xl border transition-all text-rose-500 hover:bg-rose-500/10 ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-200'
                  }`}
                  title="Sign Out of App"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
