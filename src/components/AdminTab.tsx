import React, { useState } from 'react';
import { StudentRecord } from '../types';
import { STUDENT_RECORDS } from '../data/defaultData';
import { triggerFeedback } from '../utils/cyberEffects';

interface AdminTabProps {
  onViewStudentReport: (student: StudentRecord) => void;
}

export const AdminTab: React.FC<AdminTabProps> = ({ onViewStudentReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePersona, setActivePersona] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleRefresh = (e: React.MouseEvent) => {
    triggerFeedback(e.currentTarget as HTMLElement, e, 'silver-blue');
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('已同步最新 Firestore 学员与诊断数据');
    }, 600);
  };

  const handleExportCSV = (e: React.MouseEvent) => {
    triggerFeedback(e.currentTarget as HTMLElement, e, 'gold-purple');
    showToast('正在导出学员定位数据 CSV 表格...');
  };

  const filteredStudents = STUDENT_RECORDS.filter((s) => {
    const matchesPersona =
      activePersona === 'all' || s.personaType === activePersona;
    const query = searchTerm.toLowerCase().trim();
    if (!query) return matchesPersona;
    const matchText =
      `${s.name} ${s.englishName} ${s.email} ${s.location} ${s.latestDiagnosisTitle}`.toLowerCase();
    return matchesPersona && matchText.includes(query);
  });

  return (
    <div className="flex flex-col w-full gap-4 pb-20 select-none">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1c1f29] border border-[#00f1fd]/40 shadow-[0_8px_24px_rgba(0,0,0,0.7)] text-[12px] font-headline font-semibold text-[#dfe2ef] animate-bounce whitespace-nowrap">
          <span className="material-symbols-outlined text-[#00f1fd] text-[16px]">
            verified
          </span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Verification & Header Section */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262a34]/80 backdrop-blur-md border border-white/5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f1fd] shadow-[0_0_8px_#00f1fd]" />
            <span className="font-headline text-[10px] text-[#00dce6] tracking-wider uppercase font-bold">
              ADMIN CONSOLE /admin
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExportCSV}
              className="h-8 px-2.5 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#cbc3d7] hover:text-white flex items-center gap-1 transition-all active:scale-95 shadow-sm border border-white/5 cursor-pointer font-headline text-[11px] font-semibold"
            >
              <span className="material-symbols-outlined text-[15px]">file_download</span>
              <span>导出 CSV</span>
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className={`w-8 h-8 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#cbc3d7] hover:text-white flex items-center justify-center transition-all shadow-sm border border-white/5 cursor-pointer ${
                isRefreshing ? 'animate-spin' : 'active:rotate-180'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="font-headline text-[22px] text-white font-bold tracking-tight">
            学员与诊断管理大盘
          </h1>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3] shadow-[0_0_8px_#4edea3]" />
            </span>
            <p className="text-[12px] text-[#4edea3] font-headline">
              权限已校验：
              <code className="text-[11px] text-white font-semibold bg-[#1c1f29] px-1 py-0.5 rounded border border-white/10">
                role == 'admin'
              </code>{' '}
              (Firestore Rule Active)
            </p>
          </div>
        </div>
      </section>

      {/* Core Statistics KPI Grid */}
      <section className="grid grid-cols-2 gap-2.5">
        {/* Stat 1 */}
        <div className="p-3.5 rounded-2xl bg-[#181b25] border border-white/5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#a078ff]/10 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="font-headline text-[11px] text-[#cbc3d7]">
              注册学员总数
            </span>
            <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">
              group
            </span>
          </div>
          <div className="mt-2 font-headline">
            <div className="text-[24px] font-bold text-white tracking-tight font-mono">
              1,482
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#4edea3] font-bold">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>
              <span>+18 本周新入</span>
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-3.5 rounded-2xl bg-[#181b25] border border-white/5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#00f1fd]/10 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="font-headline text-[11px] text-[#cbc3d7]">
              生成诊断报告
            </span>
            <span className="material-symbols-outlined text-[#00f1fd] text-[18px]">
              auto_graph
            </span>
          </div>
          <div className="mt-2 font-headline">
            <div className="text-[24px] font-bold text-white tracking-tight font-mono">
              3,890
              <span className="text-[12px] text-[#cbc3d7] ml-0.5 font-normal">次</span>
            </div>
            <div className="text-[11px] text-[#cbc3d7] mt-0.5">
              人均生成 <span className="text-[#00f1fd] font-bold">2.6</span> 次
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-3.5 rounded-2xl bg-[#181b25] border border-white/5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-headline text-[11px] text-[#cbc3d7]">
              Gemini API 成功率
            </span>
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
              neurology
            </span>
          </div>
          <div className="mt-2 font-headline">
            <div className="text-[24px] font-bold text-[#4edea3] tracking-tight font-mono">
              99.4%
            </div>
            <div className="text-[11px] text-[#cbc3d7] mt-0.5">
              平均耗时 <span className="text-white font-bold">4.2s</span>
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-3.5 rounded-2xl bg-[#181b25] border border-white/5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-headline text-[11px] text-[#cbc3d7]">
              主力学员人群
            </span>
            <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">
              pie_chart
            </span>
          </div>
          <div className="mt-2 font-headline">
            <div className="text-[15px] font-bold text-white truncate">
              实体店转型 <span className="text-[#d0bcff]">41%</span>
            </div>
            <div className="text-[11px] text-[#cbc3d7] mt-0.5 truncate">
              不出镜带货占 36%
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section className="flex flex-col gap-2.5">
        {/* Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#958ea0]">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索学员姓名 / Email / 行业关键词 / 诊断ID..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#181b25] text-[#dfe2ef] placeholder:text-[#958ea0] font-body text-[13px] border border-white/10 focus:outline-none focus:border-[#00f1fd] transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#958ea0] hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* 3 Core PRD Persona Quick Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              setActivePersona('all');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-lg font-headline text-[11px] font-bold transition-all cursor-pointer border ${
              activePersona === 'all'
                ? 'bg-[#a078ff] text-[#0a0e17] border-[#a078ff] shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                : 'bg-[#181b25] text-[#cbc3d7] border-white/5 hover:text-white'
            }`}
          >
            全部学员 (1,482)
          </button>
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              setActivePersona('store');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-lg font-headline text-[11px] font-bold transition-all cursor-pointer border ${
              activePersona === 'store'
                ? 'bg-[#a078ff] text-[#0a0e17] border-[#a078ff] shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                : 'bg-[#181b25] text-[#cbc3d7] border-white/5 hover:text-white'
            }`}
          >
            实体店老板 (612)
          </button>
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              setActivePersona('mom');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-lg font-headline text-[11px] font-bold transition-all cursor-pointer border ${
              activePersona === 'mom'
                ? 'bg-[#a078ff] text-[#0a0e17] border-[#a078ff] shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                : 'bg-[#181b25] text-[#cbc3d7] border-white/5 hover:text-white'
            }`}
          >
            不出镜宝妈 (534)
          </button>
          <button
            type="button"
            onClick={(e) => {
              triggerFeedback(e.currentTarget, e, 'cyan');
              setActivePersona('sidehustle');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-lg font-headline text-[11px] font-bold transition-all cursor-pointer border ${
              activePersona === 'sidehustle'
                ? 'bg-[#a078ff] text-[#0a0e17] border-[#a078ff] shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                : 'bg-[#181b25] text-[#cbc3d7] border-white/5 hover:text-white'
            }`}
          >
            高目标副业族 (336)
          </button>
        </div>
      </section>

      {/* Student List */}
      <section className="flex flex-col gap-3">
        {filteredStudents.map((std) => (
          <article
            key={std.id}
            className="p-4 rounded-2xl bg-[#181b25] border border-white/10 shadow-md flex flex-col gap-3 transition-all hover:bg-[#1c1f29]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0 w-11 h-11 rounded-xl bg-[#0a0e17] overflow-hidden flex items-center justify-center border border-white/10">
                  <img
                    src={std.avatarUrl}
                    alt={std.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline text-[15px] text-white font-bold truncate">
                      {std.name} ({std.englishName})
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#31353f] text-[#4edea3]">
                      role: {std.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#cbc3d7] truncate font-mono">
                    {std.email} · 注册 {std.registeredDate}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="text-[#958ea0] hover:text-white p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-[#00f1fd]/15 text-[#00f1fd] font-headline text-[10px] font-bold flex items-center gap-1 border border-[#00f1fd]/20">
                <span className="material-symbols-outlined text-[12px]">storefront</span>
                {std.personaLabel}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#262a34] text-[#cbc3d7] font-headline text-[10px] flex items-center gap-1 border border-white/5">
                <span className="material-symbols-outlined text-[12px]">location_on</span>
                {std.location}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#262a34] text-[#cbc3d7] font-headline text-[10px] border border-white/5">
                {std.budget}
              </span>
            </div>

            {/* Latest Diagnosis Snippet */}
            <div className="p-3 rounded-xl bg-[#0a0e17] border border-white/5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-headline text-[11px] text-[#d0bcff] flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[13px]">psychology</span>
                  最新AI诊断定位方案
                </span>
                <span className="font-headline text-[11px] text-[#4edea3] font-bold">
                  匹配度 {std.matchScore}%
                </span>
              </div>
              <p className="text-[13px] text-white font-bold leading-snug">
                {std.latestDiagnosisTitle}
              </p>
              <div className="flex items-center justify-between text-[#cbc3d7] text-[11px] pt-0.5">
                <span className="truncate">{std.latestDiagnosisSnippet}</span>
                <span className="text-[#00dce6] font-headline font-semibold shrink-0 ml-1">
                  {std.latencyText}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={(e) => {
                  triggerFeedback(e.currentTarget, e, 'cyan');
                  onViewStudentReport(std);
                }}
                className="flex-1 py-2 px-2.5 rounded-xl bg-[#d0bcff] hover:bg-[#e9ddff] text-[#3c0091] font-headline text-[12px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[15px]">visibility</span>
                <span>查看诊断报告</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  triggerFeedback(e.currentTarget, e, 'cyan');
                  showToast(`已调取 ${std.name} 的10道问卷原始作答`);
                }}
                className="py-2 px-2.5 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] font-headline text-[12px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all border border-white/5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">assignment</span>
                <span>问卷原题</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  triggerFeedback(e.currentTarget, e, 'gold-purple');
                  showToast(`已将 ${std.name} 设为学院优秀打靶精选案例 ⭐`);
                }}
                className="p-2 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#4edea3] flex items-center justify-center active:scale-95 transition-all border border-white/5 cursor-pointer"
                title="设为精选教学案例"
              >
                <span className="material-symbols-outlined text-[17px]">hotel_class</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* System Node Health Monitor */}
      <section className="p-3.5 rounded-2xl bg-[#0a0e17] border border-white/10 shadow-inner flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f1fd] text-[18px]">
              dns
            </span>
            <span className="font-headline text-[14px] text-white font-bold">
              系统节点健康度
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#00a572]/20 text-[#4edea3] font-headline text-[10px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
            运行中 100%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div className="p-2 rounded-xl bg-[#181b25] border border-white/5 flex flex-col gap-0.5">
            <span className="font-headline text-[10px] text-[#958ea0]">LLM MODEL</span>
            <span className="text-white font-bold font-headline text-[13px]">
              Gemini 3.8 Flash
            </span>
            <span className="text-[10px] text-[#4edea3]">Temp: 0.7 · Latency 3.8s</span>
          </div>

          <div className="p-2 rounded-xl bg-[#181b25] border border-white/5 flex flex-col gap-0.5">
            <span className="font-headline text-[10px] text-[#958ea0]">
              FIRESTORE SHARD
            </span>
            <span className="text-white font-bold font-headline text-[13px]">
              users & diagnoses
            </span>
            <span className="text-[10px] text-[#00f1fd]">Docs: 1,482 + 3,890</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[#958ea0] text-[10px] font-mono">
          <span>最后同步时间: 1分钟前 (实时流监听)</span>
          <span className="text-[#d0bcff]">苏哥哥AI教练系统 v2.4</span>
        </div>
      </section>
    </div>
  );
};
