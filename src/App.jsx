import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import TopicInterviewView from './components/interview/TopicInterviewView';
import MockPracticeView from './components/interview/MockPracticeView';
import PdfViewerModal from './components/modules/PdfViewerModal';
import AuthPage from './components/auth/AuthPage';
import AuthModal from './components/auth/AuthModal';

import interviewDB from './data/interview_questions_db.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('topic'); // 'topic', 'practice'
  const [selectedTopicId, setSelectedTopicId] = useState(interviewDB.topics[0].id);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState(null);
  const [activeFilterTab, setActiveFilterTab] = useState('Skill-Wise');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Authentication State with LocalStorage Persistence
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('de_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('de_current_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('de_current_user');
  };

  // Day / Night Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('de_theme_dark');
    return saved ? JSON.parse(saved) : false;
  });

  // LocalStorage persistence for mastered questions
  const [masteredQIds, setMasteredQIds] = useState(() => {
    try {
      const saved = localStorage.getItem('de_mastered_qids');
      return saved ? JSON.parse(saved) : ['py-1', 'sql-1'];
    } catch {
      return ['py-1', 'sql-1'];
    }
  });

  useEffect(() => {
    localStorage.setItem('de_mastered_qids', JSON.stringify(masteredQIds));
  }, [masteredQIds]);

  useEffect(() => {
    localStorage.setItem('de_theme_dark', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleMastered = (qId) => {
    setMasteredQIds(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const currentTopic = interviewDB.topics.find(t => t.id === selectedTopicId) || interviewDB.topics[0];

  // Full Page Style Authentication Screen when not logged in
  if (!currentUser) {
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
      isDarkMode ? 'dark-mode bg-[#060b13] text-slate-100' : 'light-mode bg-[#f3f7fe] text-slate-900'
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
