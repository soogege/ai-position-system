import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { triggerFeedback } from '../utils/cyberEffects';

interface QuizTabProps {
  onComplete: (answers: Record<string, string>) => void;
  onGoHome: () => void;
  initialAnswers?: Record<string, string>;
}

const STORAGE_KEY = 'tiktok_coach_quiz_answers';

export const QuizTab: React.FC<QuizTabProps> = ({
  onComplete,
  onGoHome,
  initialAnswers = {},
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...JSON.parse(saved), ...initialAnswers };
      }
    } catch (e) {}
    return {
      q1_stage: 'store_owner',
      q2_industry: '新山娘惹菜餐饮',
      ...initialAnswers,
    };
  });

  const [validationError, setValidationError] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx] || QUIZ_QUESTIONS[0];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPct = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  const currentVal = answers[currentQ.key] || '';

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (e) {}
  }, [answers]);

  const handleSelectOption = (value: string, e?: React.MouseEvent) => {
    if (e) triggerFeedback(e.currentTarget as HTMLElement, e, 'cyan');
    setAnswers((prev) => ({
      ...prev,
      [currentQ.key]: value,
    }));
    setValidationError(false);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) triggerFeedback(e.currentTarget as HTMLElement, e, 'silver-blue');
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setValidationError(false);
    } else {
      onGoHome();
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (!currentVal.trim()) {
      setValidationError(true);
      return;
    }

    if (e) triggerFeedback(e.currentTarget as HTMLElement, e, 'gold-purple');
    setValidationError(false);

    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Completed all 10 questions!
      onComplete(answers);
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 select-none">
      {/* 1. Top Progress Bar & Header Control */}
      <div className="w-full mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <button
            type="button"
            onClick={handlePrev}
            className="haptic-tap inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#262a34] text-[#cbc3d7] hover:text-[#dfe2ef] active:scale-95 transition-all text-[11px] font-headline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>{currentIdx === 0 ? '返回首页' : '上一题'}</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181b25] border border-white/5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00f1fd] shadow-[0_0_8px_#00f1fd] animate-pulse" />
            <span className="font-headline text-[11px] text-[#00dce6] tracking-tight font-bold">
              第 {currentIdx + 1} 题 / 共 {totalQuestions} 题 ({progressPct}%)
            </span>
          </div>
        </div>

        {/* Progress Track Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#31353f] overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#a078ff] via-[#d0bcff] to-[#00f1fd] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,241,253,0.4)]"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Step Dots (1 to 10) */}
        <div className="flex items-center justify-between px-1 mt-2">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isCompleted = idx < currentIdx;
            const isCurrent = idx === currentIdx;
            return (
              <span
                key={q.id}
                className={`transition-all duration-300 ${
                  isCurrent
                    ? 'w-2.5 h-2.5 rounded-full bg-[#00f1fd] shadow-[0_0_8px_#00f1fd] ring-2 ring-[#a078ff]/50'
                    : isCompleted
                    ? 'w-2 h-2 rounded-full bg-[#00dce6] shadow-[0_0_6px_#00dce6]'
                    : 'w-1.5 h-1.5 rounded-full bg-[#31353f]'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* 2. LocalStorage Auto-save Banner Card */}
      <div className="mb-4 p-2.5 rounded-xl bg-[#181b25] border border-white/5 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#00a572]/20 flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-[15px] text-[#4edea3]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cloud_sync
            </span>
          </div>
          <p className="text-[12px] text-[#cbc3d7] truncate">
            已实时保存至 <span className="font-bold text-[#00dce6]">本地缓存</span>，中途退出不丢失
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] font-headline text-[11px] font-bold shrink-0">
          已同步
        </span>
      </div>

      {/* 3. Main Question Card Container */}
      <div className="w-full rounded-2xl bg-[#1c1f29] border border-white/10 p-4 shadow-xl relative overflow-hidden backdrop-blur-xl">
        {/* Ambient Back Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#a078ff]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-40 h-40 bg-[#00f1fd]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Meta & Question Tag */}
        <div className="flex items-center justify-between mb-2 relative z-10">
          <span className="px-2.5 py-1 rounded-md bg-[#a078ff]/20 text-[#d0bcff] font-headline text-[11px] font-bold tracking-wide">
            {currentQ.category}
          </span>
          <span className="text-[11px] text-[#958ea0] flex items-center gap-1 font-headline">
            <span className="material-symbols-outlined text-[14px]">touch_app</span>
            {currentQ.type === 'input-with-pills' ? '点击快捷标签可秒填' : '单选题点击即选'}
          </span>
        </div>

        {/* Question Title & Subtitle */}
        <h2 className="font-headline text-[20px] text-[#dfe2ef] font-bold mb-1 relative z-10">
          Q{currentQ.id} {currentQ.title}
        </h2>
        <p className="text-[13px] text-[#cbc3d7] mb-4 relative z-10 leading-relaxed">
          {currentQ.subtitle}
        </p>

        {/* 苏哥哥AI教练小贴士 */}
        <div className="mb-4 p-2.5 rounded-xl bg-[#262a34]/80 border border-white/5 flex items-start gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#0a0e17] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Coach Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="font-headline text-[11px] text-[#00f1fd] font-bold">
                苏哥哥AI教练小贴士
              </span>
              <span className="material-symbols-outlined text-[13px] text-[#00f1fd]">
                verified
              </span>
            </div>
            <p className="text-[12px] text-[#dfe2ef] leading-snug">
              {currentQ.coachTip}
            </p>
          </div>
        </div>

        {/* Dynamic Inputs */}
        {currentQ.type === 'input-with-pills' ? (
          <div className="relative z-10 flex flex-col gap-4">
            {/* Custom Input */}
            <div>
              <label
                htmlFor="industry-input"
                className="block font-headline text-[12px] text-[#cbc3d7] mb-1 font-semibold"
              >
                自定义细分业务名称
              </label>
              <div className="relative flex items-center group">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-[#958ea0] group-focus-within:text-[#00f1fd] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">storefront</span>
                </div>
                <input
                  id="industry-input"
                  type="text"
                  value={currentVal}
                  onChange={(e) => {
                    handleSelectOption(e.target.value);
                  }}
                  placeholder={currentQ.inputPlaceholder}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[#0a0e17] text-[#dfe2ef] font-body text-[14px] placeholder:text-[#958ea0]/70 border border-white/10 focus:outline-none focus:border-[#00f1fd] shadow-inner focus:shadow-[0_0_20px_rgba(0,241,253,0.25)] transition-all"
                />
                {currentVal && (
                  <button
                    type="button"
                    onClick={(e) => {
                      triggerFeedback(e.currentTarget, e, 'cyan');
                      handleSelectOption('');
                    }}
                    aria-label="清除内容"
                    className="absolute right-3.5 w-7 h-7 rounded-full flex items-center justify-center text-[#958ea0] hover:text-white hover:bg-[#262a34] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Pills Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline text-[12px] text-[#dfe2ef] font-bold">
                  推荐快捷标签
                </span>
                <span className="font-headline text-[11px] text-[#958ea0]">
                  单选直接覆盖
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {currentQ.pills?.map((pill) => {
                  const isSelected =
                    currentVal === pill || currentVal.includes(pill);
                  return (
                    <button
                      key={pill}
                      type="button"
                      onClick={(e) => handleSelectOption(pill, e)}
                      className={`haptic-tap flex items-center justify-between p-3 rounded-xl transition-all select-none text-left cursor-pointer border ${
                        isSelected
                          ? 'bg-[#a078ff]/25 border-[#00f1fd] text-[#dfe2ef] shadow-[0_0_16px_rgba(0,242,254,0.2)]'
                          : 'bg-[#262a34] border-white/5 text-[#cbc3d7] hover:text-white hover:bg-[#31353f]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            isSelected ? 'text-[#00f1fd]' : 'text-[#958ea0]'
                          }`}
                        >
                          {pill === '餐饮'
                            ? 'restaurant'
                            : pill === '美容'
                            ? 'spa'
                            : pill === '家居'
                            ? 'chair'
                            : pill === '教育'
                            ? 'school'
                            : pill === '保健品'
                            ? 'medication'
                            : pill === '服装'
                            ? 'apparel'
                            : pill === '数码3C'
                            ? 'devices'
                            : 'map'}
                        </span>
                        <span className="font-headline text-[13px] font-bold truncate">
                          {pill}
                        </span>
                      </div>

                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#00f1fd] text-[#00373a] shadow-sm'
                            : 'bg-[#31353f] text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px] font-bold">
                          check
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Single Select Rich Cards */
          <div className="relative z-10 flex flex-col gap-2.5">
            {currentQ.options?.map((opt) => {
              const isSelected = currentVal === opt.id || currentVal === opt.title;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={(e) => handleSelectOption(opt.title, e)}
                  className={`haptic-tap flex items-start gap-3 p-3.5 rounded-xl transition-all select-none text-left cursor-pointer border relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#a078ff]/20 border-[#00f1fd] shadow-[0_0_20px_rgba(0,242,254,0.2)]'
                      : 'bg-[#262a34]/80 border-white/5 hover:bg-[#31353f] hover:border-white/10'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#00f1fd] text-[#00373a] shadow-[0_0_10px_#00f1fd]'
                        : 'bg-[#0a0e17] text-[#cbc3d7]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {opt.icon || 'check_circle'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-headline text-[14px] font-bold text-[#dfe2ef] truncate">
                        {opt.title}
                      </span>
                      {opt.tag && (
                        <span
                          className={`font-headline text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                            isSelected
                              ? 'bg-[#00f1fd]/20 text-[#00f1fd]'
                              : 'bg-[#31353f] text-[#cbc3d7]'
                          }`}
                        >
                          {opt.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#cbc3d7] leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>

                  {/* Radio Indicator */}
                  <div className="shrink-0 pt-1">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#00f1fd] bg-[#00f1fd] text-[#00373a]'
                          : 'border-[#494454] bg-transparent'
                      }`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[13px] font-bold">
                          check
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Validation Alert Note */}
      {validationError && (
        <div className="mt-3 px-4 py-2.5 rounded-xl bg-[#93000a]/40 border border-[#ffb4ab]/30 text-[#ffdad6] text-[12px] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>请填写具体内容或选择一个选项后再继续下一题。</span>
        </div>
      )}

      {/* 4. Bottom Floating Interactive Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 max-w-[480px] mx-auto px-4 py-2.5 bg-[#0a0e17]/95 backdrop-blur-xl border-t border-white/5 shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3">
          {/* Previous Question Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="haptic-tap w-1/3 py-3 px-3 rounded-xl bg-[#262a34] text-[#dfe2ef] font-headline text-[13px] font-semibold flex items-center justify-center gap-1 active:scale-[0.98] transition-all hover:bg-[#31353f] border border-white/5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">navigate_before</span>
            <span>{currentIdx === 0 ? '首页' : '上一题'}</span>
          </button>

          {/* Next / Submit Dynamic CTA */}
          <button
            type="button"
            onClick={handleNext}
            className={`haptic-tap w-2/3 py-3 px-4 rounded-xl font-headline text-[14px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,241,253,0.35)] active:translate-y-0.5 transition-all cursor-pointer ${
              currentIdx === totalQuestions - 1
                ? 'bg-gradient-to-r from-[#a078ff] via-[#00f1fd] to-[#4edea3] text-[#0a0e17]'
                : 'bg-gradient-to-r from-[#a078ff] to-[#00f1fd] text-[#0a0e17]'
            }`}
          >
            <span>
              {currentIdx === totalQuestions - 1
                ? '立即生成 AI 诊断报告'
                : `下一题 (Q${currentIdx + 2})`}
            </span>
            <span className="material-symbols-outlined text-[18px]">
              {currentIdx === totalQuestions - 1 ? 'rocket_launch' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
