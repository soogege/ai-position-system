import React, { useState } from 'react';
import { DiagnosisReport, TopicItem } from '../types';
import { triggerFeedback, copyTextToClipboard } from '../utils/cyberEffects';

interface ReportTabProps {
  report: DiagnosisReport;
  onReDiagnose: () => void;
  onOpenScriptGenerator: (topic?: TopicItem) => void;
}

export const ReportTab: React.FC<ReportTabProps> = ({
  report,
  onReDiagnose,
  onOpenScriptGenerator,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedBio, setCopiedBio] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleCopyText = async (
    text: string,
    id: string,
    e: React.MouseEvent,
    label = '内容'
  ) => {
    triggerFeedback(e.currentTarget as HTMLElement, e, 'cyan');
    const cleanText = text.replace(/^[“”"']|[“”"']$/g, '').trim();
    const success = await copyTextToClipboard(cleanText);
    if (success) {
      setCopiedId(id);
      showToast(`${label}已复制，随时可发！`);
      setTimeout(() => setCopiedId(null), 1800);
    } else {
      showToast('复制失败，请手动长按复制');
    }
  };

  const handleCopyBio = async (e: React.MouseEvent) => {
    triggerFeedback(e.currentTarget as HTMLElement, e, 'cyan');
    const success = await copyTextToClipboard(report.bio);
    if (success) {
      setCopiedBio(true);
      showToast('主页简介文案已复制！可直接粘贴到 TikTok');
      setTimeout(() => setCopiedBio(false), 2200);
    } else {
      showToast('复制失败，请长按文本复制');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 select-none">
      {/* Dynamic Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a0e17]/95 backdrop-blur-xl border border-[#4edea3]/40 shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(78,222,163,0.3)] max-w-[90vw] whitespace-nowrap animate-bounce">
          <div className="w-5 h-5 rounded-full bg-[#4edea3]/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#4edea3] text-[15px] font-bold">
              check_circle
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#dfe2ef] text-[12px] font-headline font-semibold">
            <span className="text-[#4edea3]">已就绪 ✓</span>
            <span className="text-[#cbc3d7]">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 1. Top Status Banner */}
      <div className="bg-[#262a34] rounded-2xl p-4 border border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00f1fd]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-[#00f1fd]/20 text-[#00f1fd] flex items-center justify-center shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-[20px]">celebration</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-headline text-[11px] text-[#00f1fd] tracking-wide uppercase font-bold">
                TikTok 定位诊断报告
              </span>
              <span className="text-[11px] text-[#cbc3d7]/80 font-mono">
                {report.createdAt || '刚刚生成'}
              </span>
            </div>
            <p className="font-headline text-[16px] text-[#dfe2ef] font-bold leading-tight mb-2">
              你的 TikTok 定位诊断已生成完毕！
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-[#cbc3d7]">推荐匹配指数</span>
              <div className="flex text-[#6ff6ff] text-[14px]">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <span className="font-headline text-[11px] text-[#4edea3] font-bold ml-1">
                {report.matchScore}% 匹配度
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Positioning Core Result Card */}
      <div className="bg-[#1c1f29] rounded-2xl p-4 border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">
              location_on
            </span>
            <span className="font-headline text-[16px] font-bold text-[#dfe2ef]">
              你的定位诊断结果
            </span>
          </div>
          <span className="bg-[#a078ff]/20 text-[#d0bcff] font-headline text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#a078ff]/30">
            {report.matchType}
          </span>
        </div>

        {/* One-Sentence Highlight */}
        <div className="bg-[#0a0e17] p-3.5 rounded-xl border border-white/5 relative">
          <span className="font-headline text-[11px] text-[#00f1fd] uppercase tracking-wider block mb-1 font-bold">
            一句话精准定位
          </span>
          <div className="font-headline text-[18px] text-[#6ff6ff] leading-snug font-bold tracking-tight">
            {report.oneSentencePositioning}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {report.positioningTags.map((tag) => (
              <span
                key={tag}
                className="bg-[#262a34] text-[#cbc3d7] font-headline text-[10px] font-medium px-2 py-0.5 rounded-md border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Monetization Paths */}
        <div className="space-y-2.5">
          <div className="font-headline text-[13px] text-[#dfe2ef] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
              monetization_on
            </span>
            <span>推荐变现路径</span>
          </div>

          {/* Main Path */}
          <div className="bg-[#181b25] p-3 rounded-xl border border-white/5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] shrink-0" />
                <span className="font-headline text-[13px] text-[#4edea3] font-bold truncate">
                  {report.mainPath.title}
                </span>
              </div>
              <span className="bg-[#00a572]/20 text-[#4edea3] font-headline text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                {report.mainPath.tag}
              </span>
            </div>
            <p className="text-[12px] text-[#cbc3d7] leading-relaxed pl-3.5">
              <strong className="text-[#dfe2ef]">原因解析：</strong>
              {report.mainPath.reason}
            </p>
          </div>

          {/* Alternative Path */}
          <div className="bg-[#181b25] p-3 rounded-xl border border-white/5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#a078ff] shrink-0" />
                <span className="font-headline text-[13px] text-[#d0bcff] font-bold truncate">
                  {report.altPath.title}
                </span>
              </div>
              <span className="bg-[#a078ff]/20 text-[#d0bcff] font-headline text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                {report.altPath.tag}
              </span>
            </div>
            <p className="text-[12px] text-[#cbc3d7] leading-relaxed pl-3.5">
              <strong className="text-[#dfe2ef]">原因解析：</strong>
              {report.altPath.reason}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Persona & Bio Card */}
      <div className="bg-[#1c1f29] rounded-2xl p-4 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00f1fd] text-[20px]">
              badge
            </span>
            <span className="font-headline text-[16px] font-bold text-[#dfe2ef]">
              人设设定与包装方案
            </span>
          </div>
          <span className="font-headline text-[11px] text-[#cbc3d7]">一键取用</span>
        </div>

        {/* Account Names */}
        <div className="space-y-1.5">
          <span className="font-headline text-[11px] text-[#cbc3d7] block font-semibold">
            账号名备选建议（点击复制）
          </span>
          <div className="grid grid-cols-1 gap-2">
            {report.accountNames.map((name, idx) => {
              const isCopied = copiedId === `acc-name-${idx}`;
              return (
                <div
                  key={name}
                  onClick={(e) => handleCopyText(name, `acc-name-${idx}`, e, '账号名')}
                  className="bg-[#0a0e17] px-3 py-2.5 rounded-xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-[#262a34] transition-colors haptic-tap"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-headline text-[12px] text-[#00f1fd] font-mono font-bold">
                      0{idx + 1}
                    </span>
                    <span className="font-headline text-[14px] text-[#dfe2ef] font-bold truncate">
                      {name}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="copy-btn haptic-tap bg-[#262a34] hover:bg-[#31353f] text-[#cbc3d7] hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-headline font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isCopied ? 'check' : 'content_copy'}
                    </span>
                    <span>{isCopied ? '已复制' : '复制'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-headline text-[11px] text-[#cbc3d7] font-semibold">
              主页简介文案 (Bio)
            </span>
            <button
              type="button"
              onClick={handleCopyBio}
              className="copy-btn haptic-tap bg-[#00f1fd]/20 hover:bg-[#00f1fd]/30 text-[#00f1fd] px-2.5 py-1 rounded-md font-headline text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedBio ? 'done_all' : 'content_copy'}
              </span>
              <span>{copiedBio ? '已复制 ✓' : '一键复制'}</span>
            </button>
          </div>
          <div className="bg-[#0a0e17] p-3.5 rounded-xl border border-white/5">
            <p className="text-[13px] text-[#dfe2ef] leading-relaxed">
              {report.bio}
            </p>
          </div>
        </div>

        {/* Persona Tags */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="font-headline text-[11px] text-[#cbc3d7]">人设标签：</span>
          {report.personaTags.map((tag, idx) => (
            <span
              key={tag}
              onClick={(e) => triggerFeedback(e.currentTarget, e, 'cyan')}
              className={`font-headline text-[11px] font-bold px-2.5 py-1 rounded-full cursor-pointer haptic-tap border ${
                idx === 0
                  ? 'bg-[#a078ff]/15 border-[#a078ff]/30 text-[#d0bcff]'
                  : idx === 1
                  ? 'bg-[#00f1fd]/15 border-[#00f1fd]/30 text-[#00f1fd]'
                  : 'bg-[#4edea3]/15 border-[#4edea3]/30 text-[#4edea3]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 4. 前 10 条冷启动核心选题 */}
      <div className="bg-[#1c1f29] rounded-2xl p-4 border border-white/10 shadow-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
              movie_edit
            </span>
            <span className="font-headline text-[16px] font-bold text-[#dfe2ef]">
              前 10 条冷启动核心选题
            </span>
          </div>
          <span className="bg-[#4edea3]/20 text-[#4edea3] font-headline text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#4edea3]/30">
            高完播模型
          </span>
        </div>

        <p className="text-[12px] text-[#cbc3d7] leading-relaxed">
          严控前 3 秒黄金停留率。以下为首批精选工业化交付脚本库，带一键复制开头钩子：
        </p>

        {/* Topics List */}
        <div className="space-y-2.5">
          {report.topTopics.map((topic, idx) => {
            const isHookCopied = copiedId === `hook-${topic.id}`;
            return (
              <div
                key={topic.id}
                className="bg-[#0a0e17] p-3.5 rounded-xl border border-white/5 space-y-2 hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#00f1fd]/20 text-[#00f1fd] font-mono text-[11px] flex items-center justify-center font-bold shrink-0">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="bg-[#262a34] text-[#00dce6] font-headline text-[10px] font-bold px-2 py-0.5 rounded">
                      {topic.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) =>
                        handleCopyText(topic.hook, `hook-${topic.id}`, e, '黄金钩子')
                      }
                      className="copy-btn haptic-tap text-[#00f1fd] font-headline text-[11px] font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {isHookCopied ? 'check' : 'content_copy'}
                      </span>
                      <span>{isHookCopied ? '已复制' : '复制钩子'}</span>
                    </button>
                  </div>
                </div>

                <div className="font-headline text-[14px] text-[#dfe2ef] font-bold leading-snug">
                  {topic.title}
                </div>

                <div className="bg-[#181b25] p-2.5 rounded-lg border border-white/5 text-[#cbc3d7] text-[12px]">
                  <span className="text-[#00f1fd] font-bold font-headline block mb-0.5 text-[11px]">
                    前 3 秒黄金钩子：
                  </span>
                  <span className="italic leading-normal">{topic.hook}</span>
                </div>

                {/* Instant Generate Script Trigger */}
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      triggerFeedback(e.currentTarget, e, 'gold-purple');
                      onOpenScriptGenerator(topic);
                    }}
                    className="haptic-tap inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#a078ff]/20 hover:bg-[#a078ff]/30 text-[#d0bcff] font-headline text-[11px] font-bold border border-[#a078ff]/30 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">
                      auto_fix_high
                    </span>
                    <span>AI 生成本条分镜脚本</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. 30 天落地行动方案 */}
      <div className="bg-[#1c1f29] rounded-2xl p-4 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00f1fd] text-[20px]">
              calendar_month
            </span>
            <span className="font-headline text-[16px] font-bold text-[#dfe2ef]">
              30 天落地行动方案
            </span>
          </div>
          <div className="bg-[#00f1fd]/15 text-[#00f1fd] font-headline text-[10px] font-bold px-2 py-0.5 rounded border border-[#00f1fd]/30">
            建议频次：2条/天
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="space-y-3 relative pl-4">
          <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-[#31353f]" />

          {report.actionPlan.map((plan, i) => {
            const colors = ['#00f1fd', '#a078ff', '#4edea3', '#6ff6ff'];
            const color = colors[i % colors.length];
            return (
              <div key={plan.week} className="relative pl-3">
                <div
                  className="absolute -left-[14px] top-1.5 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="bg-[#0a0e17] p-3 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-headline text-[13px] font-bold"
                      style={{ color }}
                    >
                      {plan.week}：{plan.title}
                    </span>
                    <span className="font-headline text-[10px] text-[#cbc3d7]/80">
                      {plan.range}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#cbc3d7] leading-relaxed">
                    {plan.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Staged Goals Cards */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-[#0a0e17] p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-1 text-[#00f1fd] mb-1">
              <span className="material-symbols-outlined text-[15px]">flag</span>
              <span className="font-headline text-[11px] font-bold">30 天核心目标</span>
            </div>
            <div className="font-headline text-[18px] text-white font-bold mb-0.5">
              {report.milestones.day30.target}
            </div>
            <p className="text-[11px] text-[#cbc3d7] leading-tight">
              {report.milestones.day30.desc}
            </p>
          </div>

          <div className="bg-[#0a0e17] p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-1 text-[#4edea3] mb-1">
              <span className="material-symbols-outlined text-[15px]">stars</span>
              <span className="font-headline text-[11px] font-bold">90 天跃迁目标</span>
            </div>
            <div className="font-headline text-[18px] text-[#4edea3] font-bold mb-0.5">
              {report.milestones.day90.target}
            </div>
            <p className="text-[11px] text-[#cbc3d7] leading-tight">
              {report.milestones.day90.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 6. 最可能踩的坑与下一步 */}
      <div className="grid grid-cols-1 gap-3">
        {/* Pitfalls */}
        <div className="bg-[#93000a]/20 border border-[#ffb4ab]/30 p-4 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-[#ffb4ab]">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <span className="font-headline text-[14px] font-bold">
              ⚠️ 最可能踩的 3 个坑
            </span>
          </div>
          <ul className="text-[12px] text-[#dfe2ef] space-y-1.5 pl-4 list-disc marker:text-[#ffb4ab]">
            {report.pitfalls.map((p, i) => (
              <li key={i} className="leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-[#262a34] border border-white/10 p-4 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-[#00f1fd]">
            <span className="material-symbols-outlined text-[20px]">play_circle</span>
            <span className="font-headline text-[14px] font-bold">
              👉 下一步立即行动指引
            </span>
          </div>
          <div className="text-[12px] text-[#cbc3d7] space-y-1 leading-relaxed">
            {report.nextSteps.map((step, i) => (
              <p key={i}>{step}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Sticky Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 max-w-[480px] mx-auto px-4 py-2.5 bg-[#0a0e17]/95 backdrop-blur-xl border-t border-white/5 shadow-[0_-8px_24px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-3">
          {/* Re-diagnose */}
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'silver-blue');
              onReDiagnose();
            }}
            className="haptic-tap flex-1 py-3 px-3 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] font-headline text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 border border-white/5 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[17px]">replay</span>
            <span>重新诊断</span>
          </button>

          {/* Script Generator Trigger */}
          <div className="relative flex-[1.6]">
            <button
              type="button"
              onClick={(e) => {
                triggerFeedback(e.currentTarget, e, 'gold-purple');
                onOpenScriptGenerator();
              }}
              className="haptic-tap w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#a078ff] via-[#00f1fd] to-[#4edea3] text-[#0a0e17] font-headline text-[14px] font-bold shadow-[0_4px_20px_rgba(0,241,253,0.35)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[19px]">auto_fix_high</span>
              <span>AI 生成分镜脚本</span>
            </button>
            <span className="absolute -top-2.5 right-2 bg-[#1c1f29] text-[#00f1fd] text-[9px] font-headline font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f1fd] animate-pulse" />
              Gemini驱动
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
