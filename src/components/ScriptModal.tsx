import React, { useState, useEffect } from 'react';
import { TopicItem, VideoScript } from '../types';
import { triggerFeedback, copyTextToClipboard } from '../utils/cyberEffects';

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: TopicItem;
  niche?: string;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  topic,
  niche = '南洋家居好物不出镜带货',
}) => {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<VideoScript | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedScene, setCopiedScene] = useState<number | null>(null);

  const defaultTopicTitle =
    topic?.title || '《别再买这种拖把了！3个马新租房党必看踩雷清单》';
  const defaultHook =
    topic?.hook ||
    '“如果你在马来西亚租房，先别急着买拖把，看我这3秒你省下RM200！”';

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    fetch('/api/generate-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: defaultTopicTitle,
        hook: defaultHook,
        niche: niche,
        persona: '不出镜数字人带货',
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (!isMounted) return;
        if (resData.script) {
          setScript(resData.script);
        }
      })
      .catch((err) => {
        console.error('Fetch script error:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, defaultTopicTitle, defaultHook, niche]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleCopyFullScript = async (e: React.MouseEvent) => {
    triggerFeedback(e.currentTarget as HTMLElement, e, 'gold-purple');
    if (!script) return;

    let fullText = `【${script.topicTitle} - 工业化分镜带货脚本】\n时长预估：${script.estimatedDuration}\n\n`;
    script.scenes.forEach((sc) => {
      fullText += `[镜头 ${sc.sceneIndex}] (${sc.timeRange}) ${sc.stage}\n`;
      fullText += `🎥 画面: ${sc.visual}\n`;
      fullText += `🗣️ 台词: ${sc.spokenAudio}\n`;
      fullText += `📝 花字: ${sc.onScreenText}\n`;
      fullText += `🎵 音效: ${sc.soundEffect}\n\n`;
    });
    fullText += `💡 数字人提示词: ${script.productionTips.digitalAvatarPrompt}\n`;
    fullText += `🎶 BGM推荐: ${script.productionTips.bgmSuggestion}\n`;
    fullText += `💬 首评置顶: ${script.productionTips.firstCommentSeed}\n`;

    await copyTextToClipboard(fullText);
    showToast('完整带货分镜脚本已复制！可直接导入剪映或 HeyGen');
  };

  const handleCopyScene = async (index: number, text: string, e: React.MouseEvent) => {
    triggerFeedback(e.currentTarget as HTMLElement, e, 'cyan');
    await copyTextToClipboard(text);
    setCopiedScene(index);
    showToast(`镜头 ${index} 台词已复制`);
    setTimeout(() => setCopiedScene(null), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1f29] border border-[#00f1fd]/40 shadow-2xl text-[12px] font-headline font-bold text-[#dfe2ef] animate-bounce whitespace-nowrap">
          <span className="material-symbols-outlined text-[#00f1fd] text-[16px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-[480px] max-h-[90vh] bg-[#0f131c] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#181b25]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#a078ff]/20 flex items-center justify-center text-[#d0bcff]">
              <span className="material-symbols-outlined text-[18px]">movie_edit</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-[14px] text-white font-bold truncate">
                AI 工业化带货分镜脚本
              </span>
              <span className="text-[11px] text-[#00f1fd] font-mono">
                Gemini Pro 算法优化 · 30-45s 黄金完播
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a34] flex items-center justify-center text-[#958ea0] hover:text-white transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Topic Banner */}
          <div className="p-3 rounded-xl bg-[#1c1f29] border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-headline text-[10px] text-[#00f1fd] font-bold uppercase tracking-wider">
                当前选题
              </span>
              <span className="text-[11px] text-[#cbc3d7]/80 font-mono">
                预估时长：{script?.estimatedDuration || '35秒'}
              </span>
            </div>
            <h3 className="font-headline text-[15px] text-white font-bold leading-snug">
              {script?.topicTitle || defaultTopicTitle}
            </h3>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-2 border-[#00f1fd] border-t-transparent rounded-full animate-spin" />
              <p className="text-[13px] text-[#cbc3d7] font-headline animate-pulse">
                苏哥哥 AI 正在为你编写高转化 5 幕分镜脚本...
              </p>
            </div>
          ) : script ? (
            <>
              {/* Scene Timeline */}
              <div className="space-y-3">
                {script.scenes.map((sc) => {
                  const isCopied = copiedScene === sc.sceneIndex;
                  return (
                    <div
                      key={sc.sceneIndex}
                      className="p-3.5 rounded-xl bg-[#181b25] border border-white/5 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#00f1fd] text-[#00373a] font-mono text-[11px] flex items-center justify-center font-bold">
                            {sc.sceneIndex}
                          </span>
                          <span className="font-headline text-[12px] text-white font-bold">
                            {sc.stage}
                          </span>
                          <span className="text-[10px] text-[#958ea0] font-mono">
                            {sc.timeRange}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) =>
                            handleCopyScene(sc.sceneIndex, sc.spokenAudio, e)
                          }
                          className="haptic-tap text-[11px] text-[#00f1fd] font-headline font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {isCopied ? 'check' : 'content_copy'}
                          </span>
                          <span>{isCopied ? '已复制' : '复制台词'}</span>
                        </button>
                      </div>

                      {/* Visual */}
                      <div className="text-[12px] text-[#cbc3d7] leading-relaxed flex items-start gap-1.5">
                        <span className="text-[#a078ff] font-headline font-bold shrink-0">
                          🎥 画面：
                        </span>
                        <span>{sc.visual}</span>
                      </div>

                      {/* Spoken Audio */}
                      <div className="p-2 rounded-lg bg-[#0a0e17] border border-white/5 text-[12px] text-[#dfe2ef] leading-relaxed">
                        <span className="text-[#4edea3] font-headline font-bold block mb-0.5">
                          🗣️ 口播台词：
                        </span>
                        <span className="italic">{sc.spokenAudio}</span>
                      </div>

                      {/* Sub Meta: Text & Audio */}
                      <div className="flex items-center justify-between text-[11px] text-[#958ea0] pt-1 border-t border-white/5">
                        <span className="truncate">📝 花字: {sc.onScreenText}</span>
                        <span className="truncate shrink-0 ml-2">
                          🎵 {sc.soundEffect}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Production Tips */}
              <div className="p-3.5 rounded-xl bg-[#262a34]/80 border border-white/5 space-y-2">
                <span className="font-headline text-[12px] text-[#e9ddff] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#a078ff]">
                    psychology
                  </span>
                  出片提效锦囊
                </span>

                <div className="text-[11px] text-[#cbc3d7] space-y-1 leading-relaxed">
                  <p>
                    <strong className="text-white">AI数字人提示词：</strong>
                    {script.productionTips.digitalAvatarPrompt}
                  </p>
                  <p>
                    <strong className="text-white">推荐BGM：</strong>
                    {script.productionTips.bgmSuggestion}
                  </p>
                  <p>
                    <strong className="text-white">首评置顶带节奏：</strong>
                    {script.productionTips.firstCommentSeed}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-3 border-t border-white/10 bg-[#181b25] flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#262a34] text-[#cbc3d7] hover:text-white font-headline text-[12px] font-semibold border border-white/5 cursor-pointer"
          >
            关闭窗口
          </button>
          <button
            type="button"
            onClick={handleCopyFullScript}
            className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#00f1fd] text-[#0a0e17] font-headline text-[13px] font-bold shadow-[0_4px_16px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>一键复制全部分镜脚本</span>
          </button>
        </div>
      </div>
    </div>
  );
};
