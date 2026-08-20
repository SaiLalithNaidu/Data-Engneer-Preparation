import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import TopicInfographicView from './components/interview/TopicInfographicView';
import RealTimeConceptView from './components/interview/RealTimeConceptView';
import TopicInterviewView from './components/interview/TopicInterviewView';
import MockPracticeView from './components/interview/MockPracticeView';
import PdfViewerModal from './components/modules/PdfViewerModal';
import AuthPage from './components/auth/AuthPage';

import interviewDB from './data/interview_questions_db.json';
import { apiFetch } from './api/client';

export default function App() {
  const [activeTab, setActiveTab] = useState('topic'); // 'topic', 'practice'
  const [selectedTopicId, setSelectedTopicId] = useState(interviewDB.topics[0].id);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState(null);
  const [activeFilterTab, setActiveFilterTab] = useState('Skill-Wise');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Authentication Token & User Profile State
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('de_auth_token') || null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('de_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Individual User Mastered Questions Progress State
  const [masteredQIds, setMasteredQIds] = useState([]);

  // Fetch individual user progress from backend API when logged in
  useEffect(() => {
    if (authToken && currentUser) {
      // First initialize from local storage for instant speed and offline backup
      const userKey = currentUser.email || currentUser.id || 'default';
      const localSaved = localStorage.getItem(`de_mastered_${userKey}`);
      if (localSaved) {
        try {
          setMasteredQIds(JSON.parse(localSaved));
        } catch (e) {}
      }

      // Sync with backend API
      apiFetch('/user/progress', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.masteredQIds)) {
          setMasteredQIds(data.masteredQIds);
          localStorage.setItem(`de_mastered_${userKey}`, JSON.stringify(data.masteredQIds));
        } else if (data && !data.success) {
          console.info('[PROGRESS SYNC NOTICE]', data.message);
        }
      })
      .catch(err => {
        console.warn('Backend progress fetch notice (using local cache):', err.message);
      });
    } else {
      setMasteredQIds([]);
    }
  }, [authToken, currentUser]);

  // Day / Night Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('de_theme_dark');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('de_theme_dark', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Login Success Callback
  const handleLoginSuccess = (userData, token) => {
    setCurrentUser(userData);
    setAuthToken(token);
    localStorage.setItem('de_current_user', JSON.stringify(userData));
    localStorage.setItem('de_auth_token', token);
  };

  // Log Out Callback: Clears session and redirects directly to Sign In / Sign Up full page
  const handleSignOut = () => {
    setCurrentUser(null);
    setAuthToken(null);
    setMasteredQIds([]);
    localStorage.removeItem('de_current_user');
    localStorage.removeItem('de_auth_token');
  };

  // Toggle Mastered Question with Backend Database Sync & Local Backup
  const handleToggleMastered = (qId) => {
    const updated = masteredQIds.includes(qId)
      ? masteredQIds.filter(id => id !== qId)
      : [...masteredQIds, qId];

    setMasteredQIds(updated);

    if (currentUser) {
      const userKey = currentUser.email || currentUser.id || 'default';
      localStorage.setItem(`de_mastered_${userKey}`, JSON.stringify(updated));
    }

    // Save to backend database for logged in user
    if (authToken && !authToken.startsWith('guest_')) {
      apiFetch('/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ masteredQIds: updated })
      }).catch(err => console.warn('Failed to sync progress to database:', err));
    }
  };

  const currentTopic = interviewDB.topics.find(t => t.id === selectedTopicId) || interviewDB.topics[0];

  // Full Page Style Authentication Screen when not logged in
  if (!currentUser || !authToken) {
    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${
      isDarkMode ? 'dark-mode bg-[#050811] text-slate-100' : 'light-mode bg-[#f0f4fc] text-slate-900'
    }`}>
      
      {/* Topic Navigation Sidebar */}
      <Sidebar
        topics={interviewDB.topics}
        selectedTopicId={selectedTopicId}
        setSelectedTopicId={setSelectedTopicId}
        selectedSubtopicId={selectedSubtopicId}
        setSelectedSubtopicId={setSelectedSubtopicId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        masteredQIds={masteredQIds}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Canvas Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeFilterTab={activeFilterTab}
          setActiveFilterTab={setActiveFilterTab}
          onOpenPdfModal={() => setIsPdfModalOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />

        {/* Main Canvas Area */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Active Screen View */}
          {activeTab === 'topic' && (
            <TopicInterviewView
              topic={currentTopic}
              selectedSubtopicId={selectedSubtopicId}
              masteredQIds={masteredQIds}
              onToggleMastered={handleToggleMastered}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'infographic' && (
            <TopicInfographicView
              topicId={selectedTopicId}
              selectedSubtopicId={selectedSubtopicId}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'concepts' && (
            <RealTimeConceptView
              topicId={selectedTopicId}
              selectedSubtopicId={selectedSubtopicId}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'practice' && (
            <MockPracticeView
              topics={interviewDB.topics}
              isDarkMode={isDarkMode}
            />
          )}

        </main>

      </div>

      {/* Source PDF Modal */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

    </div>
  );
}
