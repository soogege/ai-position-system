import React from 'react';
import { triggerFeedback } from '../utils/cyberEffects';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAs: (name: string, role: string, email: string) => void;
  currentEmail?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginAs,
  currentEmail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-[480px] max-h-[92vh] bg-[#0f131c] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-y-auto no-scrollbar p-5 space-y-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#262a34] flex items-center justify-center text-[#958ea0] hover:text-white transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Top Pill Micro-Badge */}
        <div className="inline-flex items-center self-start space-x-1.5 px-3 py-1 rounded-full bg-[#262a34] text-[#00f1fd] text-[11px] font-headline font-bold shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00f1fd] animate-pulse" />
          <span>苏哥哥AI短视频变现学院</span>
          <span className="text-[#958ea0]">·</span>
          <span className="text-[#4edea3]">实战赋能 · 马新首选</span>
        </div>

        {/* Main Punchy Title */}
        <div>
          <h1 className="text-[22px] font-headline font-bold tracking-tight text-white leading-tight">
            3分钟测出你的
            <br />
            <span className="bg-gradient-to-r from-[#d0bcff] via-[#00f1fd] to-[#4edea3] bg-clip-text text-transparent">
              TikTok 爆款赚钱定位
            </span>
          </h1>
          <p className="text-[12px] text-[#cbc3d7] mt-1.5 leading-relaxed">
            基于 Gemini Pro 深度算法，专为马来西亚 & 新加坡华人商家、实体店老板、副业人群打造。不讲空话，先定变现路径再做号。
          </p>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#1c1f29] text-[11px] font-headline font-semibold border border-white/5">
          <div className="flex items-center space-x-1">
            <span>🔥</span>
            <span className="text-[#4edea3] font-bold">1,480+</span>
            <span className="text-[#cbc3d7]">马新学员已测</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center space-x-1">
            <span>⚡</span>
            <span className="text-[#d0bcff] font-bold">30天</span>
            <span className="text-[#cbc3d7]">变现执行蓝图</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center space-x-1">
            <span>🎯</span>
            <span className="text-[#00f1fd] font-bold">98.4%</span>
            <span className="text-[#cbc3d7]">匹配成功率</span>
          </div>
        </div>

        {/* Mentor Quote Card */}
        <div className="relative rounded-2xl bg-[#181b25] p-3.5 border border-white/5 shadow-md">
          <div className="flex items-start space-x-3">
            <div className="relative shrink-0 w-11 h-11 rounded-full overflow-hidden border border-cyan-400/30">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="苏哥哥"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0a0e17] flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#4edea3] text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[13px] font-headline font-bold text-white">
                  苏哥哥 · 学院创办人
                </span>
                <span className="text-[10px] font-headline font-bold px-2 py-0.5 rounded-full bg-[#31353f] text-[#4edea3]">
                  亲研算法体系
                </span>
              </div>
              <p className="text-[11px] text-[#cbc3d7] italic leading-normal">
                “做 TikTok 最怕盲目跟风。搞清楚你是带货挂车、引流实体店还是做私域高客单，省下 3 个月试错成本。”
              </p>
            </div>
          </div>
        </div>

        {/* Login Selection */}
        <div className="space-y-2 pt-1">
          {/* Option A: Login as Alex */}
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'gold-purple');
              onLoginAs('Alex', '马来西亚华人商家', 'alex.wong.vlog@gmail.com');
              onClose();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white text-[#0a0e17] shadow-xl hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 flex items-center justify-center bg-white rounded-full p-1 shadow-sm shrink-0">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.43 7.35 24 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.96 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.57 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-headline text-[13px] font-bold text-[#0a0e17]">
                  以 Alex 账号登录 (VIP 学员)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  alex.wong.vlog@gmail.com
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#181b25] text-[#4edea3] font-headline text-[10px] font-bold">
              当前账号
            </span>
          </button>

          {/* Option B: Guest Quick Mode */}
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              onLoginAs('新晋学员', '马新创作者', 'guest.creator@tiktok.my');
              onClose();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#cbc3d7] hover:text-white font-headline text-[12px] font-semibold border border-white/5 cursor-pointer transition-all"
          >
            <span>以游客学员身份继续体验</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

        {/* Real Cases Proof */}
        <div className="space-y-2 pt-1 border-t border-white/5">
          <div className="flex items-center justify-between text-[11px] text-[#cbc3d7]">
            <span className="font-headline font-bold text-white flex items-center gap-1">
              <span className="material-symbols-outlined text-[#00f1fd] text-[15px]">
                verified_user
              </span>
              马新学员真实打靶战绩
            </span>
            <span className="text-[10px] text-[#958ea0]">已脱敏实录</span>
          </div>

          <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-[#181b25] border border-white/5 text-[11px]">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#0a0e17]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80"
                alt="Nyonya food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-white">新山娘惹菜餐厅</span>
                <span className="text-[#4edea3] font-headline text-[10px] font-bold">
                  实体获客
                </span>
              </div>
              <p className="text-[11px] text-[#cbc3d7] truncate mt-0.5">
                单条探店爆款引流 <strong className="text-[#4edea3]">40+ 桌到店</strong>
                ，单日客单突破 RM120+
              </p>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="pt-2 text-center text-[10px] text-[#958ea0] flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[#4edea3] text-[13px]">
            shield
          </span>
          <span>Firebase Auth 企业级加密 · 独立隔离加密保护</span>
        </div>
      </div>
    </div>
  );
};
