import React from 'react';
import { triggerFeedback } from '../utils/cyberEffects';

interface HomeTabProps {
  onStartQuiz: () => void;
  onViewReport: (reportId?: string) => void;
  onViewAllHistory: () => void;
  userName?: string;
  userRole?: string;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onStartQuiz,
  onViewReport,
  onViewAllHistory,
  userName = 'Alex',
  userRole = '马来西亚华人商家',
}) => {
  return (
    <div className="flex flex-col w-full gap-5 pb-8 select-none">
      {/* 1. 学员迎宾区 */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-[11px] text-[#00f1fd] tracking-widest uppercase font-bold">
                VIP CREATOR COHORT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse shadow-[0_0_8px_#4edea3]" />
            </div>
            <h1 className="font-headline text-[18px] text-[#dfe2ef] font-bold tracking-tight mt-0.5 truncate">
              欢迎回来，{userName}{' '}
              <span className="text-[13px] text-[#cbc3d7] font-normal tracking-normal">
                ({userRole})
              </span>
            </h1>
          </div>

          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#262a34] flex items-center justify-center shadow-md overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Student Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0a0e17] flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[#00f1fd] text-[12px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          </div>
        </div>

        {/* 教练寄语卡片 */}
        <div className="relative overflow-hidden rounded-2xl bg-[#181b25] p-3.5 border border-white/5 shadow-lg">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#a078ff]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#31353f]/80 flex items-center justify-center shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">
                format_quote
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-[13px] text-[#d0bcff] font-semibold">
                  苏哥哥 AI 教练专属寄语
                </span>
                <span className="text-[10px] text-[#cbc3d7]/60 font-mono">Today</span>
              </div>
              <p className="text-[13px] text-[#dfe2ef] leading-relaxed">
                “先定变现路径，再做短视频。用 AI 帮你在 TikTok 最快拿到第一笔结果。”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 核心启动行动卡片 */}
      <section className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-[11px] text-[#cbc3d7] font-semibold tracking-wide">
            核心启动引擎
          </span>
          <span className="font-headline text-[11px] text-[#00dce6] font-mono">
            EST. 3 MIN
          </span>
        </div>

        <div
          onClick={(e) => {
            triggerFeedback(e.currentTarget, e, 'cyan');
            onStartQuiz();
          }}
          className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-[#a078ff]/30 via-[#262a34] to-[#0a0e17] p-4 border border-cyan-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] active:scale-[0.985] transition-all duration-300"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#a078ff]/20 to-[#00f1fd]/25 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

          {/* SVG Tech Grid Motif */}
          <svg
            className="absolute right-0 top-0 w-36 h-36 opacity-15 pointer-events-none"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="80"
              cy="20"
              r="40"
              stroke="#00f1fd"
              strokeDasharray="4 4"
              strokeWidth="2"
            />
            <circle cx="80" cy="20" r="20" stroke="#d0bcff" strokeWidth="1.5" />
            <path d="M40 80 L90 30" stroke="#4edea3" strokeWidth="1.5" />
          </svg>

          <div className="relative flex flex-col gap-3 z-10">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0e17]/80 backdrop-blur-md border border-white/5">
                <span
                  className="material-symbols-outlined text-[#00f1fd] text-[16px] animate-spin"
                  style={{ animationDuration: '6s' }}
                >
                  neurology
                </span>
                <span className="font-headline text-[11px] text-[#00f1fd] font-bold tracking-wider uppercase">
                  Algorithm V3.6 Ready
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] font-headline text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                实时极速
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-headline text-[22px] text-white tracking-tight font-bold group-hover:text-[#00f1fd] transition-colors">
                开始 3 分钟 AI 定位诊断
              </h2>
              <p className="text-[13px] text-[#cbc3d7] leading-relaxed">
                基于 10 道核心画像题 · 智能生成 30 天行动指南与前 10 条选题钩子
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#a078ff] flex items-center justify-center text-[10px] text-[#340080] font-bold shadow-sm">
                    AI
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#00f1fd] flex items-center justify-center text-[10px] text-[#00373a] font-bold shadow-sm">
                    MY
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#4edea3] flex items-center justify-center text-[10px] text-[#003824] font-bold shadow-sm">
                    SG
                  </div>
                </div>
                <span className="font-headline text-[11px] text-[#cbc3d7] font-medium">
                  已有 1,480+ 马新学员通关
                </span>
              </div>

              {/* Glowing CTA Arrow */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#a078ff] to-[#00f1fd] flex items-center justify-center shadow-[0_0_16px_rgba(0,242,254,0.4)] group-hover:shadow-[0_0_24px_rgba(0,242,254,0.7)] group-hover:translate-x-1 transition-all">
                <span className="material-symbols-outlined text-[#0a0e17] text-[20px] font-bold">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 学员特色权益标签 */}
      <section className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-[11px] text-[#cbc3d7] font-semibold">
            当前账号特权
          </span>
          <span className="font-headline text-[11px] text-[#4edea3] flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[13px]">lock_open</span>
            永久赋能
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto py-1 no-scrollbar">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#262a34]/90 border border-white/5 shrink-0 shadow-md">
            <div className="w-7 h-7 rounded-lg bg-[#0a0e17] flex items-center justify-center text-[#00f1fd]">
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-[12px] text-[#dfe2ef] font-bold">
                AI数字人批量脚本
              </span>
              <span className="text-[10px] text-[#cbc3d7]">降本提效单周破万播放</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#262a34]/90 border border-white/5 shrink-0 shadow-md">
            <div className="w-7 h-7 rounded-lg bg-[#0a0e17] flex items-center justify-center text-[#d0bcff]">
              <span className="material-symbols-outlined text-[16px]">translate</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-[12px] text-[#dfe2ef] font-bold">
                马新双语爆款算法
              </span>
              <span className="text-[10px] text-[#cbc3d7]">精准击穿本土化痛点</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#262a34]/90 border border-white/5 shrink-0 shadow-md">
            <div className="w-7 h-7 rounded-lg bg-[#0a0e17] flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[16px]">storefront</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-[12px] text-[#dfe2ef] font-bold">
                实体店/副业专属变现
              </span>
              <span className="text-[10px] text-[#cbc3d7]">WhatsApp与挂车闭环</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 最近 2 条诊断记录 */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#a078ff] text-[18px]">
              history
            </span>
            <span className="font-headline text-[14px] text-[#dfe2ef] font-bold">
              最近 2 条诊断记录
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              onViewAllHistory();
            }}
            className="font-headline text-[11px] text-[#a078ff] hover:text-[#d0bcff] transition-colors flex items-center gap-0.5 cursor-pointer"
          >
            全部报告{' '}
            <span className="material-symbols-outlined text-[13px]">
              chevron_right
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Record 1 */}
          <div
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              onViewReport('rep-default-01');
            }}
            className="group relative overflow-hidden rounded-2xl bg-[#1c1f29] border border-white/5 p-3.5 shadow-md active:bg-[#262a34] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px] text-[#cbc3d7] font-mono">
                    2025-02-18
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#494454]" />
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] font-headline text-[10px] font-semibold">
                    <span
                      className="material-symbols-outlined text-[11px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    已完成
                  </span>
                </div>
                <h3 className="font-headline text-[15px] text-[#dfe2ef] font-bold truncate group-hover:text-[#00f1fd] transition-colors">
                  家居好物种草不出镜带货号
                </h3>
                <p className="text-[12px] text-[#cbc3d7] mt-0.5 line-clamp-1">
                  核心货盘：智能小家电与收纳 · 转化路径：TikTok Shop 橱窗挂车
                </p>
              </div>

              {/* Match Rate */}
              <div className="flex flex-col items-end shrink-0 pl-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-headline text-[22px] font-bold text-[#4edea3] font-mono">
                    96
                  </span>
                  <span className="font-headline text-[12px] text-[#4edea3] font-semibold">
                    %
                  </span>
                </div>
                <span className="text-[10px] text-[#cbc3d7]">画像匹配度</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 flex items-center justify-between bg-[#0a0e17]/50 rounded-xl px-2.5 py-1.5 border border-white/5">
              <div className="flex items-center gap-1.5 text-[#cbc3d7] text-[11px]">
                <span className="material-symbols-outlined text-[14px] text-[#00f1fd]">
                  insights
                </span>
                <span>已生成 10 个爆款开头钩子与行动清单</span>
              </div>
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-[#a078ff]/20 text-[#d0bcff] font-headline text-[11px] font-semibold group-hover:bg-[#a078ff] group-hover:text-[#340080] transition-all">
                查看报告{' '}
                <span className="material-symbols-outlined text-[12px]">
                  arrow_forward
                </span>
              </span>
            </div>
          </div>

          {/* Record 2 */}
          <div
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              onViewReport('rep-default-02');
            }}
            className="group relative overflow-hidden rounded-2xl bg-[#1c1f29] border border-white/5 p-3.5 shadow-md active:bg-[#262a34] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px] text-[#cbc3d7] font-mono">
                    2025-01-29
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#494454]" />
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] font-headline text-[10px] font-semibold">
                    <span
                      className="material-symbols-outlined text-[11px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    已完成
                  </span>
                </div>
                <h3 className="font-headline text-[15px] text-[#dfe2ef] font-bold truncate group-hover:text-[#00f1fd] transition-colors">
                  新山实体餐饮本地探店引流
                </h3>
                <p className="text-[12px] text-[#cbc3d7] mt-0.5 line-clamp-1">
                  核心客群：新加坡越境周末客 · 转化路径：WhatsApp 预约包厢
                </p>
              </div>

              {/* Match Rate */}
              <div className="flex flex-col items-end shrink-0 pl-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-headline text-[22px] font-bold text-[#00f1fd] font-mono">
                    91
                  </span>
                  <span className="font-headline text-[12px] text-[#00f1fd] font-semibold">
                    %
                  </span>
                </div>
                <span className="text-[10px] text-[#cbc3d7]">画像匹配度</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 flex items-center justify-between bg-[#0a0e17]/50 rounded-xl px-2.5 py-1.5 border border-white/5">
              <div className="flex items-center gap-1.5 text-[#cbc3d7] text-[11px]">
                <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">
                  location_on
                </span>
                <span>已生成同城POI锚点矩阵策略</span>
              </div>
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-[#31353f] text-[#dfe2ef] font-headline text-[11px] font-semibold group-hover:bg-[#a078ff] group-hover:text-[#340080] transition-all">
                查看报告{' '}
                <span className="material-symbols-outlined text-[12px]">
                  arrow_forward
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 底部保障 */}
      <div className="flex items-center justify-center gap-1.5 py-2 opacity-80">
        <span className="material-symbols-outlined text-[#00f1fd] text-[15px]">
          verified_user
        </span>
        <span className="font-headline text-[11px] text-[#cbc3d7]">
          苏哥哥亲自校验诊断模型 · 马新出海实战保障
        </span>
      </div>
    </div>
  );
};
