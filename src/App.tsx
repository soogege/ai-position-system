import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { QuizTab } from './components/QuizTab';
import { AnalyzingView } from './components/AnalyzingView';
import { ReportTab } from './components/ReportTab';
import { HistoryTab } from './components/HistoryTab';
import { AdminTab } from './components/AdminTab';
import { ScriptModal } from './components/ScriptModal';
import { LoginModal } from './components/LoginModal';

import { DiagnosisReport, HistoryItem, StudentRecord, TopicItem } from './types';
import { DEFAULT_REPORT, DEFAULT_HISTORY_ITEMS } from './data/defaultData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState<DiagnosisReport>(DEFAULT_REPORT);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(DEFAULT_HISTORY_ITEMS);

  // User Profile
  const [userName, setUserName] = useState('Alex');
  const [userRole, setUserRole] = useState('马来西亚华人商家');
  const [userEmail, setUserEmail] = useState('alex.wong.vlog@gmail.com');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Script Modal state
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | undefined>(undefined);

  // Handlers
  const handleStartQuiz = () => {
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = async (answers: Record<string, string>) => {
    setIsAnalyzing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          userProfile: { name: userName, role: userRole },
        }),
      });
      const resData = await res.json();
      if (resData.data) {
        const newRep: DiagnosisReport = {
          ...resData.data,
          id: `rep-${Date.now()}`,
          createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        };
        setCurrentReport(newRep);

        // Add to history
        const newHistItem: HistoryItem = {
          id: `hist-${Date.now()}`,
          title: newRep.oneSentencePositioning.replace(/[「」]/g, ''),
          timestamp: new Date().toISOString(),
          dateStr: `${new Date().toLocaleDateString('zh-CN')} (新诊断)`,
          status: 'completed',
          statusLabel: '已完成 · 专属方案',
          matchScore: newRep.matchScore || 98.4,
          tags: newRep.positioningTags.map((t) => `#${t}`),
          previewImage:
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
          previewSubtext: 'TikTok Shop 闭环转化体系',
          assetCountText: '10 条黄金选题钩子已生成',
          targetMetrics: '已根据 10 项画像权重完成深度计算',
          reportData: newRep,
        };
        setHistoryItems((prev) => [newHistItem, ...prev]);
      }
    } catch (err) {
      console.error('Quiz diagnosis failed, keeping fallback report:', err);
    }
  };

  const handleAnalysisFinished = () => {
    setIsAnalyzing(false);
    setCurrentTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryReport = (item: HistoryItem) => {
    if (item.reportData) {
      setCurrentReport(item.reportData);
    }
    setCurrentTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeDraft = (_item: HistoryItem) => {
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewStudentReport = (student: StudentRecord) => {
    // Generate a temporary view report for the student
    const studentReport: DiagnosisReport = {
      ...DEFAULT_REPORT,
      id: `rep-std-${student.id}`,
      matchScore: student.matchScore,
      oneSentencePositioning: student.latestDiagnosisTitle,
      accountNames: [`@${student.englishName}TikTok`, '@南洋智选主理人', '@马新爆款营'],
    };
    setCurrentReport(studentReport);
    setCurrentTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenScript = (topic?: TopicItem) => {
    setSelectedTopic(topic || currentReport.topTopics[0]);
    setIsScriptModalOpen(true);
  };

  return (
    <div className="bg-[#0f131c] text-[#dfe2ef] min-h-screen flex flex-col font-body selection:bg-[#a078ff] selection:text-[#340080] relative">
      {/* Background ambient radial gradients */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(160,120,255,0.15),rgba(15,19,28,0.95))]" />

      {/* App Fixed Top Header */}
      <Header
        currentTab={currentTab}
        onOpenLogin={() => setIsLoginOpen(true)}
        userName={userName}
        userEmail={userEmail}
      />

      {/* Main Responsive Viewport (480px width max centered on screen) */}
      <main className="flex-1 flex flex-col relative w-full max-w-[480px] mx-auto px-4 pt-20 pb-safe z-10">
        {isAnalyzing ? (
          <AnalyzingView onFinished={handleAnalysisFinished} />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeTab
                onStartQuiz={handleStartQuiz}
                onViewReport={() => {
                  setCurrentTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewAllHistory={() => {
                  setCurrentTab('history');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                userName={userName}
                userRole={userRole}
              />
            )}

            {currentTab === 'quiz' && (
              <QuizTab
                onComplete={handleQuizComplete}
                onGoHome={() => setCurrentTab('home')}
              />
            )}

            {currentTab === 'report' && (
              <ReportTab
                report={currentReport}
                onReDiagnose={handleStartQuiz}
                onOpenScriptGenerator={handleOpenScript}
              />
            )}

            {currentTab === 'history' && (
              <HistoryTab
                items={historyItems}
                onSelectReport={handleSelectHistoryReport}
                onNewDiagnosis={handleStartQuiz}
                onResumeDraft={handleResumeDraft}
              />
            )}

            {currentTab === 'admin' && (
              <AdminTab onViewStudentReport={handleViewStudentReport} />
            )}
          </>
        )}
      </main>

      {/* Bottom Floating Navigation */}
      {!isAnalyzing && (
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      )}

      {/* Interactive AI Script Generator Drawer / Modal */}
      <ScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        topic={selectedTopic}
        niche={currentReport.oneSentencePositioning}
      />

      {/* User Login & Welcome Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginAs={(name, role, email) => {
          setUserName(name);
          setUserRole(role);
          setUserEmail(email);
        }}
        currentEmail={userEmail}
      />
    </div>
  );
}
