import React from 'react';
import { triggerFeedback } from '../utils/cyberEffects';

export type NavTab = 'home' | 'quiz' | 'report' | 'history' | 'admin';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: 'home' as NavTab,
      label: '首页诊断',
      icon: 'home',
    },
    {
      id: 'quiz' as NavTab,
      label: '问卷答题',
      icon: 'psychology',
    },
    {
      id: 'report' as NavTab,
      label: '我的报告',
      icon: 'analytics',
    },
    {
      id: 'history' as NavTab,
      label: '历史记录',
      icon: 'history',
    },
    {
      id: 'admin' as NavTab,
      label: '管理后台',
      icon: 'tune',
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#0a0e17]/92 backdrop-blur-xl border-t border-white/5 shadow-[0_-8px_32px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around h-16 px-1 max-w-[480px] mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                triggerFeedback(e.currentTarget, e, 'cyan');
                onTabChange(tab.id);
              }}
              className={`haptic-tap flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#00f1fd] bg-[#262a34]/60 shadow-[0_0_16px_rgba(0,242,254,0.15)] font-semibold'
                  : 'text-[#cbc3d7]/70 hover:text-[#dfe2ef]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] mb-0.5 transition-transform duration-200 ${
                  isActive ? 'scale-110 drop-shadow-[0_0_6px_#00f1fd]' : 'group-hover:scale-105'
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-headline text-[11px] tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
