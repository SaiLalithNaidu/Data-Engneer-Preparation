import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  Briefcase,
  Code,
  Database,
  Cloud,
  Zap,
  Layers,
  Sun,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthPage({ onLoginSuccess, isDarkMode, setIsDarkMode }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    targetRole: 'Data Engineer'
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signInData.email.trim() || !signInData.password.trim()) {
      setErrorMsg('Please enter both Email and Password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        fullName: signInData.email.split('@')[0].toUpperCase(),
        email: signInData.email,
        targetRole: 'Data Engineer',
        loggedInAt: new Date().toISOString()
      };
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      onLoginSuccess(user);
    }, 500);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signUpData.fullName.trim() || !signUpData.email.trim() || !signUpData.password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        fullName: signUpData.fullName,
        email: signUpData.email,
        targetRole: signUpData.targetRole,
        loggedInAt: new Date().toISOString()
      };
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      onLoginSuccess(user);
    }, 500);
  };

  const handleDemoLogin = (role = 'Data Engineer') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        fullName: 'Demo Engineer',
        email: 'engineer@nxtwave.prep',
        targetRole: role,
        loggedInAt: new Date().toISOString()
      };
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      onLoginSuccess(user);
    }, 300);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-[#060b13] text-slate-100' : 'bg-[#f3f7fe] text-slate-900'
    }`}>
      
      {/* Top Navbar Header */}
      <header className={`p-5 border-b flex items-center justify-between transition-colors ${
        isDarkMode ? 'bg-[#0b111e]/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight font-heading bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                DataEng Prep Suite
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
                1,800+ Questions
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Topic-Wise Technical Interview Preparation</p>
          </div>
        </div>

        {/* Day / Night Theme Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800' 
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          <span className="hidden sm:inline">{isDarkMode ? 'Night Mode' : 'Day Mode'}</span>
        </button>
      </header>

      {/* Main Authentication Page Hero Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Feature Highlights & Value Proposition (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NxtWave Style Data Engineering Learning Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight">
            Master Data Engineering Technical Interviews
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Comprehensive preparation platform with 1,800+ questions across 9 core technologies, crystal-clear simple explanations, and VS Code code editor syntax highlighting.
          </p>

          {/* Feature Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm font-heading">200+ Qs Per Topic</h4>
                  <p className="text-xs text-slate-400">Python, SQL, PySpark, AWS, Snowflake & dbt</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm font-heading">VS Code Syntax Editor</h4>
                  <p className="text-xs text-slate-400">Line numbers, color tokens & edit mode</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm font-heading">Tree View Sidebar</h4>
                  <p className="text-xs text-slate-400">Collapsible subtopic folder tree</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm font-heading">Simple English</h4>
                  <p className="text-xs text-slate-400">Easy, clear explanations & rules</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Sign In / Sign Up Page Form Card (5 Cols) */}
        <div className="lg:col-span-5 w-full">
          
          <div className={`rounded-3xl border shadow-2xl overflow-hidden transition-all ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Form Banner Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white text-center space-y-3">
              <h2 className="text-xl font-extrabold tracking-tight font-heading">
                {authMode === 'signin' ? 'Welcome Back!' : 'Create Preparation Account'}
              </h2>
              <p className="text-xs text-indigo-100 font-medium">
                {authMode === 'signin' 
                  ? 'Sign in to access your interview question bank & progress' 
                  : 'Join thousands of engineers preparing for top data roles'}
              </p>

              {/* Mode Switcher Tabs */}
              <div className="flex bg-black/20 p-1 rounded-xl backdrop-blur-sm text-xs font-bold max-w-xs mx-auto">
                <button
                  onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMode === 'signin' 
                      ? 'bg-white text-indigo-900 shadow-md font-extrabold' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMode === 'signup' 
                      ? 'bg-white text-indigo-900 shadow-md font-extrabold' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-5">
              
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {authMode === 'signin' ? (
                /* SIGN IN FORM */
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="engineer@company.com"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In & Access Question Bank →'}
                  </button>

                </form>
              ) : (
                /* SIGN UP FORM */
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Lalith Kumar"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="engineer@company.com"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Target Role Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Job Role</label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={signUpData.targetRole}
                        onChange={(e) => setSignUpData({ ...signUpData, targetRole: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="Data Engineer">Data Engineer</option>
                        <option value="Cloud AI Data Engineer">Cloud AI Data Engineer</option>
                        <option value="PySpark / Spark Developer">PySpark / Spark Developer</option>
                        <option value="Snowflake & dbt Developer">Snowflake & dbt Developer</option>
                        <option value="SQL Data Architect">SQL Data Architect</option>
                      </select>
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Confirm</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account & Start Learning 🎉'}
                  </button>

                </form>
              )}

              {/* Quick Demo Login Divider */}
              <div className="pt-2 border-t border-inherit text-center space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">
                  Or 1-Click Instant Demo Access
                </span>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Data Engineer')}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'bg-slate-900/90 border-slate-800 hover:bg-slate-800 text-amber-300' 
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Instant Guest Demo Access →</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Page Footer */}
      <footer className={`p-4 border-t text-center text-xs text-slate-400 font-medium ${
        isDarkMode ? 'border-slate-800 bg-[#0b111e]' : 'border-slate-200 bg-white'
      }`}>
        Data Engineer Technical & Interview Preparation Suite • Built with React & Tailwind CSS
      </footer>

    </div>
  );
}
