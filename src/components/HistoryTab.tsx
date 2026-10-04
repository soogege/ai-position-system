import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { triggerFeedback, copyTextToClipboard } from '../utils/cyberEffects';

interface HistoryTabProps {
  items: HistoryItem[];
  onSelectReport: (item: HistoryItem) => void;
  onNewDiagnosis: () => void;
  onResumeDraft: (item: HistoryItem) => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  items,
  onSelectReport,
  onNewDiagnosis,
  onResumeDraft,
}) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'draft'>('all');
  const [isTimeSort, setIsTimeSort] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleCopyHook = async (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerFeedback(e.currentTarget as HTMLElement, e, 'cyan');
    await copyTextToClipboard(text);
    showToast('已复制该定位方案与爆款钩子，随时可用！');
  };

  const handleExportPDF = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerFeedback(e.currentTarget as HTMLElement, e, 'gold-purple');
    showToast('正在生成 2025 年高精 PDF 变现蓝图报告...');
  };

  const filteredItems = items
    .filter((item) => {
      if (filter === 'all') return true;
      return item.status === filter;
    })
    .sort((a, b) => {
      if (isTimeSort) {
        return b.timestamp.localeCompare(a.timestamp);
      }
      return b.matchScore - a.matchScore;
    });

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.status === 'completed').length;
  const draftCount = items.filter((i) => i.status === 'draft').length;

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1c1f29] border border-[#4edea3]/40 shadow-[0_8px_24px_rgba(0,0,0,0.7)] text-[12px] font-headline font-semibold text-[#dfe2ef] animate-bounce whitespace-nowrap">
          <span className="material-symbols-outlined text-[#4edea3] text-[16px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Summary Section */}
      <section className="flex flex-col gap-3 pt-1 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f1fd] shadow-[0_0_10px_#00f1fd]" />
              <span className="font-headline text-[11px] text-[#00f1fd] tracking-widest uppercase font-bold">
                ARCHIVE SYSTEM
              </span>
            </div>
            <h1 className="font-headline text-[22px] text-[#dfe2ef] font-bold tracking-tight mt-0.5">
              历史诊断记录
            </h1>
            <p className="text-[12px] text-[#cbc3d7] mt-0.5">
              共存档 {totalCount} 份专属变现定位方案 · 随时回溯与执行
            </p>
          </div>

          {/* Quick Action: New Diagnosis */}
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'gold-purple');
              onNewDiagnosis();
            }}
            className="haptic-tap shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#00f1fd] text-[#0a0e17] shadow-[0_4px_20px_rgba(0,242,254,0.35)] active:translate-y-0.5 transition-all cursor-pointer font-headline text-[12px] font-bold"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>新诊断</span>
          </button>
        </div>

        {/* 4-Metric Ambient Matrix Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1c1f29]/90 border border-white/10 p-4 shadow-xl">
          <div className="absolute -right-10 -top-10 w-36 h-36 bg-[#a078ff]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {/* Metric 1 */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-[#cbc3d7] text-[11px] font-headline">
                <span className="material-symbols-outlined text-[14px]">folder_managed</span>
                <span>累计诊断次数</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5 font-headline">
                <span className="text-[28px] font-bold text-white font-mono">04</span>
                <span className="text-[11px] text-[#cbc3d7]">次</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-[#cbc3d7] text-[11px] font-headline">
                <span className="material-symbols-outlined text-[#4edea3] text-[14px]">verified</span>
                <span>最优画像匹配</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5 font-headline">
                <span className="text-[28px] font-bold text-[#4edea3] font-mono">98.4</span>
                <span className="text-[11px] text-[#4edea3] font-bold">%</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-[#cbc3d7] text-[11px] font-headline">
                <span className="material-symbols-outlined text-[#00f1fd] text-[14px]">electric_bolt</span>
                <span>爆款钩子库</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5 font-headline">
                <span className="text-[28px] font-bold text-[#00f1fd] font-mono">40+</span>
                <span className="text-[11px] text-[#cbc3d7]">条已生成</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-[#cbc3d7] text-[11px] font-headline">
                <span className="material-symbols-outlined text-[#d0bcff] text-[14px]">trending_up</span>
                <span>预估月增收空间</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5 font-headline">
                <span className="text-[18px] font-bold text-[#d0bcff]">RM 5k-20k</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="flex items-center justify-between gap-2 py-1 sticky top-16 z-30 bg-[#0f131c]/95 backdrop-blur-md">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              setFilter('all');
            }}
            className={`px-3 py-1.5 rounded-full font-headline text-[11px] font-bold transition-all cursor-pointer border ${
              filter === 'all'
                ? 'bg-[#00f1fd]/20 text-[#00f1fd] border-[#00f1fd]/40 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                : 'bg-[#262a34] text-[#cbc3d7] border-white/5 hover:text-white'
            }`}
          >
            全部 ({totalCount})
          </button>
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              setFilter('completed');
            }}
            className={`px-3 py-1.5 rounded-full font-headline text-[11px] font-bold transition-all cursor-pointer border ${
              filter === 'completed'
                ? 'bg-[#00f1fd]/20 text-[#00f1fd] border-[#00f1fd]/40 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                : 'bg-[#262a34] text-[#cbc3d7] border-white/5 hover:text-white'
            }`}
          >
            已完成 ({completedCount})
          </button>
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              setFilter('draft');
            }}
            className={`px-3 py-1.5 rounded-full font-headline text-[11px] font-bold transition-all cursor-pointer border ${
              filter === 'draft'
                ? 'bg-[#00f1fd]/20 text-[#00f1fd] border-[#00f1fd]/40 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                : 'bg-[#262a34] text-[#cbc3d7] border-white/5 hover:text-white'
            }`}
          >
            草稿待答 ({draftCount})
          </button>
        </div>

        {/* Sort Toggle */}
        <button
          type="button"
          onClick={(e) => {
            triggerFeedback(e.currentTarget, e, 'silver-blue');
            setIsTimeSort(!isTimeSort);
            showToast(isTimeSort ? '已切换至按画像匹配度排列' : '已切换至按时间倒序排列');
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#262a34] text-[#cbc3d7] hover:text-white font-headline text-[11px] font-semibold shrink-0 transition-colors border border-white/5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px] text-[#00f1fd]">
            swap_vert
          </span>
          <span>{isTimeSort ? '时间倒序' : '匹配度高'}</span>
        </button>
      </section>

      {/* Timeline Cards Stream */}
      <div className="flex flex-col gap-3.5 mt-2">
        {filteredItems.map((item) => {
          const isDraft = item.status === 'draft';
          return (
            <article
              key={item.id}
              onClick={(e) => {
                triggerFeedback(e.currentTarget, e, 'cyan');
                if (isDraft) {
                  onResumeDraft(item);
                } else {
                  onSelectReport(item);
                }
              }}
              className="group relative flex flex-col rounded-2xl bg-[#1c1f29] border border-white/10 p-4 shadow-xl transition-all duration-300 hover:border-white/20 cursor-pointer overflow-hidden"
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 relative z-10">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      isDraft ? 'bg-[#958ea0]' : 'bg-[#4edea3] shadow-[0_0_8px_#4edea3]'
                    }`}
                  />
                  <span
                    className={`font-headline text-[11px] font-bold tracking-wide ${
                      isDraft ? 'text-[#958ea0]' : 'text-[#4edea3]'
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>

                {!isDraft && (
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00f1fd]/15 text-[#00f1fd] border border-[#00f1fd]/30 font-headline text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[13px]">stars</span>
                    <span>{item.matchScore}% 匹配度</span>
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-1 mt-1 text-[#cbc3d7]/80 text-[11px] font-mono">
                <span className="material-symbols-outlined text-[13px]">schedule</span>
                <span>{item.dateStr}</span>
              </div>

              {/* Title */}
              <h2 className="font-headline text-[16px] text-white font-bold mt-2 tracking-tight group-hover:text-[#00f1fd] transition-colors leading-snug">
                {item.title}
              </h2>

              {/* Visual preview or Draft Progress */}
              {isDraft ? (
                <div className="my-2.5 space-y-2">
                  <p className="text-[12px] text-[#cbc3d7] leading-relaxed">
                    {item.targetMetrics}
                  </p>
                  <div className="w-full bg-[#31353f] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#a078ff] to-[#00f1fd] h-2 rounded-full"
                      style={{ width: `${item.draftProgress || 50}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-xl h-24 my-2.5 bg-[#0a0e17] border border-white/5">
                  <img
                    src={item.previewImage}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#0a0e17]/85 backdrop-blur-sm p-2 flex items-center justify-between">
                    <span className="font-headline text-[11px] text-[#00f1fd] font-semibold truncate flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">hub</span>
                      {item.previewSubtext}
                    </span>
                  </div>
                </div>
              )}

              {/* Persona Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-[#262a34] text-[#cbc3d7] font-headline text-[10px] font-semibold border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Summary / Actions */}
              {isDraft ? (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#958ea0] flex items-center gap-1 font-headline">
                    <span className="material-symbols-outlined text-[13px]">cloud_done</span>
                    进度已自动存档至本地
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFeedback(e.currentTarget, e, 'cyan');
                      onResumeDraft(item);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#00f1fd] font-headline text-[11px] font-bold border border-[#00f1fd]/30 cursor-pointer"
                  >
                    <span>继续完成答题</span>
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-1 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-[#cbc3d7]">
                    <span className="truncate">目标：{item.targetMetrics}</span>
                    {item.assetCountText && (
                      <span className="text-[#4edea3] font-headline font-bold shrink-0 ml-2">
                        {item.assetCountText}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={(e) =>
                        handleCopyHook(
                          `【${item.title}】核心定位方案已就绪，推荐结合马新高性价比与黄金3秒开头起跑！`,
                          e
                        )
                      }
                      className="copy-btn haptic-tap flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] font-headline text-[11px] font-semibold transition-colors border border-white/5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#00f1fd]">
                        content_copy
                      </span>
                      <span>一键复制简介</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleExportPDF}
                      className="haptic-tap flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] font-headline text-[11px] font-semibold transition-colors border border-white/5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">
                        picture_as_pdf
                      </span>
                      <span>导出 PDF 蓝图</span>
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Coach Note Footer */}
      <footer className="mt-6">
        <div className="rounded-2xl bg-[#181b25] border border-white/5 p-4 flex gap-3 items-start shadow-md">
          <div className="w-9 h-9 rounded-xl bg-[#a078ff]/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">
              verified_user
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-[13px] text-white font-bold">
                苏哥哥 AI 教练档案提示
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#4edea3]/20 text-[#4edea3] font-headline font-bold">
                加密存储
              </span>
            </div>
            <p className="text-[12px] text-[#cbc3d7] leading-relaxed">
              每一份诊断方案均为云端 Cloud Firestore 加密独立存档。建议每季度或更换核心产品线时重新进行一次定位诊断，紧跟 TikTok Shop 东南亚最新算法与挂车规则。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
