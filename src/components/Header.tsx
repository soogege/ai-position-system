import React from 'react';
import { triggerFeedback } from '../utils/cyberEffects';

interface HeaderProps {
  currentTab: string;
  onOpenLogin: () => void;
  userEmail?: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenLogin,
  userName = 'Alex',
}) => {
  const getTabSubtitle = () => {
    switch (currentTab) {
      case 'home':
        return 'Diagnostic Home';
      case 'quiz':
        return 'Quiz Session';
      case 'report':
        return 'Latest Report';
      case 'history':
        return 'Archive System';
      case 'admin':
        return 'Admin Console';
      default:
        return 'TikTok 定位诊断器';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#0a0e17]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      <div className="h-16 px-4 flex items-center justify-between max-w-[480px] mx-auto">
        {/* Brand Identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Logo badge with play + spark icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1c1f29] to-[#0f131c] border border-cyan-400/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,241,253,0.25)] relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-6 h-6">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#494454"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <polygon
                points="42,32 70,50 42,68"
                fill="url(#header-play-grad)"
              />
              <circle cx="34" cy="62" r="4.5" fill="#00f1fd" />
              <polygon
                points="66,32 70,39 77,41 71,46 72,53 66,49 60,53 61,46 55,41 62,39"
                fill="#4edea3"
              />
              <defs>
                <linearGradient
                  id="header-play-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a078ff" />
                  <stop offset="100%" stopColor="#00f1fd" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-[17px] text-[#dfe2ef] tracking-tight truncate">
                苏哥哥AI教练
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00f1fd] shadow-[0_0_8px_#00f1fd]" />
            </div>
            <span className="font-headline text-[11px] text-[#00dce6] tracking-wide truncate">
              TikTok 定位诊断器
            </span>
          </div>
        </div>

        {/* Right Section: Session info & Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex flex-col items-end hidden xs:flex">
            <span className="text-[11px] text-[#cbc3d7]/80 font-mono tracking-wider">
              {getTabSubtitle()}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              onOpenLogin();
            }}
            className="haptic-tap relative flex items-center justify-center cursor-pointer group"
            title="查看学员身份 / 切换账号"
          >
            <div className="w-8 h-8 rounded-full bg-[#a078ff] flex items-center justify-center ring-2 ring-[#a078ff]/30 shadow-md group-hover:ring-[#00f1fd]/50 transition-all">
              <span className="material-symbols-outlined text-[#3c0091] text-[18px]">
                person
              </span>
            </div>
            {/* Online Green Beacon */}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_6px_#4edea3] ring-2 ring-[#0a0e17]" />
          </button>
        </div>
      </div>
    </header>
  );
};
