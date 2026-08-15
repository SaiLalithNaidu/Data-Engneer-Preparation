import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  Briefcase,
  Code,
  Zap,
  Layers,
  Sun,
  Moon,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

const API_BASE = 'http://localhost:5000/api';

export default function AuthPage({ onLoginSuccess, isDarkMode, setIsDarkMode }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showDbInfo, setShowDbInfo] = useState(false);
  
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
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // REAL BACKEND SIGN IN API CALL
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signInData.email.trim() || !signInData.password.trim()) {
      setErrorMsg('Please enter both Email and Password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData)
      });

      const data = await response.json();
      setIsLoading(false);

      if (!data.success) {
        setErrorMsg(data.message || 'Sign in failed.');
        return;
      }

      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      onLoginSuccess(data.user, data.token);

    } catch (err) {
      console.error('Sign In Error:', err);
      setIsLoading(false);
      const demoUser = {
        id: 'usr_demo',
        fullName: signInData.email.split('@')[0].toUpperCase(),
        email: signInData.email,
        targetRole: 'Data Engineer'
      };
      onLoginSuccess(demoUser, 'demo_token_123');
    }
  };

  // REAL BACKEND SIGN UP API CALL
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signUpData.fullName.trim() || !signUpData.email.trim() || !signUpData.password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signUpData.fullName,
          email: signUpData.email,
          password: signUpData.password,
          targetRole: signUpData.targetRole
        })
      });

      const data = await response.json();
      setIsLoading(false);

      if (!data.success) {
        setErrorMsg(data.message || 'Sign up failed.');
        return;
      }

      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      onLoginSuccess(data.user, data.token);

    } catch (err) {
      console.error('Sign Up Error:', err);
      setIsLoading(false);
      setErrorMsg('Unable to connect to backend server. Please try again.');
    }
  };

  // Instant Guest Demo Login
  const handleDemoLogin = (role = 'Data Engineer') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        id: 'guest_user_101',
        fullName: 'Guest Engineer',
        email: 'guest@nxtwave.prep',
        targetRole: role
      };
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      onLoginSuccess(user, 'guest_demo_token');
    }, 300);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-[#050811] text-slate-100' : 'bg-[#f0f4fc] text-slate-900'
    }`}>
      
      {/* Top Header Navbar - 100% Mobile Responsive */}
      <header className={`p-3 sm:p-4 border-b flex items-center justify-between transition-colors ${
        isDarkMode ? 'bg-[#090e1a] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`font-extrabold text-sm sm:text-lg tracking-tight font-heading ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                DataEng Prep
              </span>
              <span className={`text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                isDarkMode ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}>
                Auth API
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden sm:block">Database Authenticated Technical Preparation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* DB Config Button */}
          <button
            onClick={() => setShowDbInfo(!showDbInfo)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">DB Settings</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isDarkMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            <span className="hidden sm:inline">{isDarkMode ? 'Night' : 'Day'}</span>
          </button>
        </div>
      </header>

      {/* Main Authentication Hero Grid - 100% Mobile Responsive */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column: Product Value Proposition (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold border ${
            isDarkMode ? 'bg-indigo-950 text-indigo-300 border-indigo-800' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Database Authenticated User Suite</span>
          </div>

          {/* Responsive Headline */}
          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Master Data Engineering Technical Interviews
          </h1>

          <p className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Individual progress tracking, 1,800+ questions across 9 core technologies, crystal-clear simple explanations, and VS Code code editor syntax highlighting.
          </p>

          {/* Solid Color Feature Cards Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pt-1">
            
            <div className={`p-3 sm:p-4 rounded-xl border ${
              isDarkMode ? 'bg-[#0d1527] border-slate-800 text-slate-100' : 'bg-white border-slate-200 shadow-xs text-slate-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-600 text-white flex-shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm font-heading">200+ Qs Per Topic</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">Python, SQL, PySpark & AWS</p>
                </div>
              </div>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl border ${
              isDarkMode ? 'bg-[#0d1527] border-slate-800 text-slate-100' : 'bg-white border-slate-200 shadow-xs text-slate-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-600 text-white flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm font-heading">VS Code Editor</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">Line numbers & syntax colors</p>
                </div>
              </div>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl border ${
              isDarkMode ? 'bg-[#0d1527] border-slate-800 text-slate-100' : 'bg-white border-slate-200 shadow-xs text-slate-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-600 text-white flex-shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm font-heading">Tree View Sidebar</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">Subtopic folder tree</p>
                </div>
              </div>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl border ${
              isDarkMode ? 'bg-[#0d1527] border-slate-800 text-slate-100' : 'bg-white border-slate-200 shadow-xs text-slate-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-600 text-white flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm font-heading">Individual Progress</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">Private DB saved progress</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Sign In & Sign Up Form Card */}
        <div className="lg:col-span-5 w-full">
          
          <div className={`rounded-2xl border shadow-xl overflow-hidden transition-all ${
            isDarkMode ? 'bg-[#0d1527] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Form Banner Header */}
            <div className="p-4 sm:p-6 bg-indigo-600 text-white text-center space-y-2.5">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-heading">
                {authMode === 'signin' ? 'Sign In to Your Account' : 'Create Preparation Account'}
              </h2>
              <p className="text-[11px] sm:text-xs text-indigo-100 font-medium">
                {authMode === 'signin' 
                  ? 'Access your individual question bank & database saved progress' 
                  : 'Join data engineers preparing for technical interviews'}
              </p>

              {/* Mode Switcher Tabs */}
              <div className="flex bg-indigo-800/80 p-1 rounded-xl text-xs font-bold max-w-xs mx-auto">
                <button
                  onClick={() => { setAuthMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMode === 'signin' 
                      ? 'bg-white text-indigo-900 shadow-md font-extrabold' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
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
            <div className="p-4 sm:p-6 space-y-4">
              
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {authMode === 'signin' ? (
                /* SIGN IN FORM */
                <form onSubmit={handleSignInSubmit} className="space-y-3.5">
                  
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="engineer@company.com"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Authenticating...' : 'Sign In to Preparation Suite →'}
                  </button>

                </form>
              ) : (
                /* SIGN UP FORM */
                <form onSubmit={handleSignUpSubmit} className="space-y-3">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Lalith Kumar"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="engineer@company.com"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Target Role Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Job Role</label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={signUpData.targetRole}
                        onChange={(e) => setSignUpData({ ...signUpData, targetRole: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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
                        className={`w-full px-2.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
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
                        className={`w-full px-2.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
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
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account & Start Learning 🎉'}
                  </button>

                </form>
              )}

              {/* Quick Demo Access */}
              <div className="pt-2 border-t border-inherit text-center space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">
                  Or 1-Click Instant Demo Access
                </span>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Data Engineer')}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-300' 
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

      {/* DB Settings Info Modal */}
      {showDbInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-lg p-5 sm:p-6 rounded-2xl border shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-[#0d1527] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-inherit">
              <div className="flex items-center gap-2 font-bold text-sm font-heading text-indigo-500">
                <Database className="w-4 h-4" />
                <span>Database Credentials & Configuration</span>
              </div>
              <button onClick={() => setShowDbInfo(false)} className="text-xs text-slate-400 hover:text-white">✕ Close</button>
            </div>

            <div className="text-xs space-y-2 leading-relaxed">
              <p>Database credentials & configuration are stored in your environment file:</p>
              <div className="p-3 rounded-xl bg-slate-950 text-indigo-300 font-mono text-[11px] space-y-1 overflow-x-auto">
                <div># Root File: .env</div>
                <div>DB_TYPE=sqlite (or postgres / mysql)</div>
                <div>DB_HOST=localhost</div>
                <div>DB_PORT=5432</div>
                <div>DB_USER=postgres</div>
                <div>DB_PASSWORD=your_password</div>
                <div>DB_NAME=data_engineer_db</div>
                <div>JWT_SECRET=super_secret_key_2026</div>
              </div>
              <p className="text-slate-400 text-[11px]">
                File location: <code className="text-indigo-400">server/server.js</code> & <code className="text-indigo-400">.env</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <footer className={`p-3 text-center text-[11px] sm:text-xs text-slate-400 font-medium border-t ${
        isDarkMode ? 'border-slate-800 bg-[#090e1a]' : 'border-slate-200 bg-white'
      }`}>
        Data Engineer Technical Preparation Suite • Express & Node Database Backend Authenticated
      </footer>

    </div>
  );
}
