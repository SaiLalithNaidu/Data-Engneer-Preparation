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
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ onLoginSuccess, isDarkMode }) {
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
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      onLoginSuccess(user);
    }, 600);
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
    }, 600);
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
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
      
      <div className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden transition-all my-auto ${
        isDarkMode 
          ? 'bg-[#0f172a] border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Top Header Branding Banner */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white text-center space-y-2 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center border border-white/30 shadow-md">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight font-heading">
            Data Engineer Prep Suite
          </h2>
          <p className="text-xs text-indigo-100 font-medium">
            Sign in to start your 1,800+ interview questions preparation
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-2 flex bg-black/20 p-1 rounded-xl backdrop-blur-sm max-w-xs mx-auto text-xs font-bold">
            <button
              onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                authMode === 'signin' 
                  ? 'bg-white text-indigo-900 shadow-md' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                authMode === 'signup' 
                  ? 'bg-white text-indigo-900 shadow-md' 
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In to Preparation Suite →'}
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

              {/* Password */}
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account & Start Learning 🎉'}
              </button>

            </form>
          )}

          {/* Quick Demo Login Divider */}
          <div className="pt-2 border-t border-inherit text-center space-y-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">
              Or 1-Click Instant Demo Login
            </span>
            <button
              type="button"
              onClick={() => handleDemoLogin('Data Engineer')}
              className={`w-full py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
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
  );
}
