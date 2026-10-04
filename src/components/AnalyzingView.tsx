import React, { useState, useEffect } from 'react';

interface AnalyzingViewProps {
  onFinished: () => void;
}

export const AnalyzingView: React.FC<AnalyzingViewProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(78);
  const [slideIdx, setSlideIdx] = useState(0);

  const tips = [
    {
      icon: '💡',
      text: '正在结合马新 TikTok Shop 算法与 GMV Max 投流逻辑计算最优路径...',
      highlight: 'GMV Max',
    },
    {
      icon: '🔍',
      text: '正在为你匹配 3 个低成本爆款选题方向与前 10 条视频黄金 3 秒钩子...',
      highlight: '3 个低成本爆款',
    },
    {
      icon: '🎯',
      text: '实体店老板无需盲目砸钱，本地精准定位转化率高出 3.8 倍。',
      highlight: '3.8 倍',
    },
  ];

  const previews = [
    '生成定制版《30天变现执行蓝图PDF》',
    '正在为你匹配 3 个低成本爆款选题方向...',
    '实体店本地精准定位变现模型深度匹配...',
  ];

  // Natural progress acceleration
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(timer);
          setTimeout(() => {
            onFinished();
          }, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onFinished]);

  // Carousel tips rotation
  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % tips.length);
    }, 2400);

    return () => clearInterval(carouselTimer);
  }, [tips.length]);

  return (
    <div className="flex flex-col w-full relative overflow-hidden py-3 select-none">
      {/* Ambient Back-Glow Canvas */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#a078ff]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-60 h-60 bg-[#00f1fd]/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#00a572]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Micro Algorithm Status Chip */}
      <div className="flex items-center justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#262a34]/80 backdrop-blur-md border border-white/10 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]" />
          </span>
          <span className="font-headline text-[11px] text-[#00dce6] tracking-wider uppercase font-bold">
            NEURAL ENGINE V3.2 ACTIVE
          </span>
        </div>
      </div>

      {/* Central Immersive AI Scanner Radar */}
      <div className="relative w-full flex flex-col items-center justify-center my-3 min-h-[280px]">
        {/* Outer Radiant Halo */}
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#a078ff]/10 via-[#00f1fd]/10 to-[#4edea3]/10 animate-pulse blur-xl pointer-events-none" />

        {/* Orbit Radar Rings */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer Track with Rotating Laser Flare */}
          <div className="absolute inset-0 rounded-full bg-[#31353f]/20 backdrop-blur-sm shadow-[0_0_30px_rgba(208,188,255,0.08)] flex items-center justify-center">
            <svg
              className="w-full h-full animate-[spin_5s_linear_infinite]"
              fill="none"
              viewBox="0 0 256 256"
            >
              <defs>
                <linearGradient
                  id="scanner-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00f1fd" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#a078ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="trail-grad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#d0bcff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#scanner-grad)"
                strokeDasharray="8 6"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <path
                d="M 128 8 A 120 120 0 0 1 248 128"
                stroke="url(#trail-grad)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle
                className="shadow-[0_0_12px_#00f1fd]"
                cx="248"
                cy="128"
                fill="#00f1fd"
                r="4"
              />
              <circle
                className="shadow-[0_0_10px_#4edea3]"
                cx="8"
                cy="128"
                fill="#4edea3"
                r="3"
              />
            </svg>
          </div>

          {/* Secondary Counter-Rotating Ring */}
          <div className="absolute w-52 h-52 rounded-full flex items-center justify-center pointer-events-none">
            <svg
              className="w-full h-full animate-[spin_8s_linear_infinite_reverse] opacity-80"
              fill="none"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="94"
                stroke="#d0bcff"
                strokeDasharray="3 14"
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />
              <polygon fill="#6ff6ff" points="100,2 104,8 100,14 96,8" />
              <polygon fill="#4edea3" points="100,186 104,192 100,198 96,192" />
              <polygon fill="#e9ddff" points="2,100 8,104 14,100 8,96" />
              <polygon fill="#00f1fd" points="186,100 192,104 198,100 192,96" />
            </svg>
          </div>

          {/* Third Pulse Core Ring */}
          <div className="absolute w-40 h-40 rounded-full bg-[#262a34]/70 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[inset_0_0_24px_rgba(160,120,255,0.25)]">
            <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center">
              <div className="relative w-16 h-16 rounded-2xl bg-[#0a0e17]/90 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                <span
                  className="material-symbols-outlined text-[32px] text-[#00f1fd] animate-pulse"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  neurology
                </span>
              </div>

              {/* Scanning Waveform Dots */}
              <div className="flex items-center gap-1 mt-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#00dce6] animate-bounce"
                  style={{ animationDelay: '0s' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#d0bcff] animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* State Headline */}
        <div className="text-center mt-4 px-4 z-10">
          <h2 className="font-headline text-[18px] text-[#dfe2ef] tracking-tight flex items-center justify-center gap-1.5 font-bold">
            <span>AI 正在深度解析你的</span>
            <span className="text-[#00f1fd] font-headline text-[22px] tracking-normal drop-shadow-[0_0_12px_rgba(0,241,253,0.4)]">
              10
            </span>
            <span>道画像</span>
          </h2>
          <p className="text-[12px] text-[#cbc3d7] mt-1">
            苏哥哥算法矩阵模型正在计算最佳流量破局点
          </p>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="bg-[#1c1f29]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 my-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-end justify-between mb-2">
          <div className="flex flex-col">
            <span className="font-headline text-[11px] text-[#00dce6] uppercase tracking-wider flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[14px]">speed</span>
              计算与匹配深度
            </span>
            <span className="text-[12px] text-[#cbc3d7] mt-0.5">跨越 12 项权重点阵</span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-headline text-[32px] text-[#00f1fd] tracking-tighter tabular-nums drop-shadow-[0_0_16px_rgba(0,241,253,0.5)] font-bold">
              {progress}
            </span>
            <span className="font-headline text-[16px] text-[#00dce6] font-bold">%</span>
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 rounded-full bg-[#31353f]/70 overflow-hidden relative p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#a078ff] via-[#00f1fd] to-[#4edea3] transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#6ff6ff] rounded-full shadow-[0_0_10px_#6ff6ff] animate-pulse" />
          </div>
        </div>

        {/* Sub-checks */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/5 bg-[#181b25]/60 rounded-xl px-2.5 py-2">
          <div className="flex items-center gap-1 min-w-0">
            <span className="material-symbols-outlined text-[#4edea3] text-[15px] shrink-0">
              check_circle
            </span>
            <span className="font-headline text-[11px] text-[#dfe2ef] truncate font-semibold">
              账号人设矩阵
            </span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="material-symbols-outlined text-[#4edea3] text-[15px] shrink-0">
              check_circle
            </span>
            <span className="font-headline text-[11px] text-[#dfe2ef] truncate font-semibold">
              变现闭环链路
            </span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="material-symbols-outlined text-[#00f1fd] text-[15px] shrink-0 animate-spin">
              sync
            </span>
            <span className="font-headline text-[11px] text-[#00dce6] truncate font-semibold">
              GMV Max权衡
            </span>
          </div>
        </div>
      </div>

      {/* AI Inspiration Carousel */}
      <div className="bg-[#262a34]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 my-2 relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">
              tips_and_updates
            </span>
            <span className="font-headline text-[13px] text-[#e9ddff] font-bold">
              AI 诊断灵感前瞻
            </span>
          </div>
          <div className="flex items-center gap-1">
            {tips.map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 ${
                  i === slideIdx
                    ? 'w-4 h-1.5 rounded-full bg-[#00f1fd]'
                    : 'w-1.5 h-1.5 rounded-full bg-[#31353f]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[56px] flex items-center">
          <div className="flex items-start gap-2.5 transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-[#1c1f29] flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-[16px]">{tips[slideIdx].icon}</span>
            </div>
            <p className="text-[13px] text-[#dfe2ef] leading-snug">
              {tips[slideIdx].text}
            </p>
          </div>
        </div>

        <div className="mt-2.5 pt-2 bg-[#0a0e17]/60 border border-white/5 rounded-lg px-3 py-1.5 flex items-center justify-between text-[#cbc3d7]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-headline text-[11px] text-[#cbc3d7] shrink-0 font-bold">
              下一步剧透:
            </span>
            <span className="text-[11px] text-[#dfe2ef] truncate">
              {previews[slideIdx]}
            </span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#00f1fd] shrink-0">
            arrow_forward
          </span>
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-4 flex flex-col items-center justify-center text-center px-4 opacity-85">
        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#181b25] border border-white/5">
          <span className="material-symbols-outlined text-[#4edea3] text-[14px]">
            verified_user
          </span>
          <span className="font-headline text-[11px] text-[#cbc3d7]">
            数据传输已通过 Cloud Firestore 安全加密
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6] shadow-[0_0_6px_#00dce6]" />
          <span className="text-[11px] text-[#00dce6] font-semibold">
            Gemini Pro 正在输出高胜率行动方案
          </span>
        </div>
      </div>
    </div>
  );
};
