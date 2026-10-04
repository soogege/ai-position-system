import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function generateFallbackScript(topic: string, hook: string, niche: string) {
  return {
    topicTitle: topic || '南洋爆款好物带货实战脚本',
    estimatedDuration: '32秒',
    scenes: [
      {
        sceneIndex: 1,
        timeRange: '00:00 - 00:03',
        stage: '黄金前3秒截流',
        visual: 'AI数字人正面特写 + 画面右侧浮动震撼踩雷红叉叉对比图，快节奏缩放',
        spokenAudio: hook || '“如果你在马来西亚租房，先别急着买拖把，看我这3秒你省下RM200！”',
        onScreenText: '🚨 租房党先别买！看这3秒省RM200',
        soundEffect: '紧急刹车声 + 悬念重低音 Whoosh',
      },
      {
        sceneIndex: 2,
        timeRange: '00:03 - 00:10',
        stage: '痛点放大与共情',
        visual: '实拍传统拖把发霉、缠满毛发、要用手用力拧干的狼狈场景特写',
        spokenAudio: '“普通拖把用两次就发黑发臭，洗的时候还要用手去拧脏水，每次搞卫生整个人都崩溃！”',
        onScreenText: '❌ 发霉发臭 / ❌ 还要用手拧',
        soundEffect: '叹气音效 + 踩雷警报滴滴声',
      },
      {
        sceneIndex: 3,
        timeRange: '00:10 - 00:20',
        stage: '解决方案与神器亮相',
        visual: 'AI测评人手持新款免手洗平板拖把，轻轻一拉一刮，污渍毛发瞬间刮净全景演示',
        spokenAudio: '“直到我换了这个免手洗自滤拖把，一推一拉，毛发污渍自动刮得干干净净，全程手不碰一滴脏水！”',
        onScreenText: '✨ 一推一拉自动刮净！双手零沾水',
        soundEffect: '清爽划过 Swoosh + 欢快轻快卡点BGM',
      },
      {
        sceneIndex: 4,
        timeRange: '00:20 - 00:26',
        stage: '实测对比与打消疑虑',
        visual: '左侧贴地缝隙360度旋转拖地，右侧干湿两用吸可乐与灰尘瞬间吸干画面',
        spokenAudio: '“360度床底沙发底都能钻进去，不仅干湿两用，立起来放还完全不占空间，Senang到不行！”',
        onScreenText: '🔥 360°无死角钻缝 | 超省空间',
        soundEffect: '清脆叮咚声 Ting',
      },
      {
        sceneIndex: 5,
        timeRange: '00:26 - 00:32',
        stage: '高转化行动号召(CTA)',
        visual: '数字人手指指向屏幕左下角小黄车站位，小黄车动态放大手势引导',
        spokenAudio: '“现在马新大促只要RM19起还免邮！左下角小黄车数量有限，手慢就没有了！”',
        onScreenText: '👇 戳左下角小黄车直抢免邮优惠！',
        soundEffect: '收银机开箱金币声 Cha-ching',
      },
    ],
    productionTips: {
      digitalAvatarPrompt: '30岁知性东南亚女性，现代深色系家居直播间背景，语速中等偏快，自信有亲和力。',
      bgmSuggestion: 'TikTok 热门轻快卡点鼓点 (节奏感强，无强烈人声干扰)',
      firstCommentSeed: '“链接在左下角第一款，西马东马包邮现货，今天下单明天发！”',
    },
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, hook, niche, persona } = req.body || {};

    if (!ai) {
      return res.status(200).json({
        success: true,
        source: 'fallback',
        script: generateFallbackScript(topic, hook, niche),
      });
    }

    const prompt = `你是苏哥哥AI短视频教练。请针对以下爆款选题，为学员生成一套工业化出片的分镜带货脚本：
【选题标题】: ${topic}
【前3秒黄金钩子】: ${hook}
【定位领域】: ${niche || '马新电商与实体'}
【人设类型】: ${persona || '实战测评人'}

请生成符合 30-45 秒黄金完播率的脚本，包含：
1. 镜头景别与动作画面（AI数字人/画中画/实拍）
2. 台词口播（马新本土化自然口吻，如 Senang、超值、RM标记）
3. 屏幕花字文案
4. 背景音乐与音效建议
5. 评论区引导互动技巧与带货挂车指令。
请输出标准 JSON 格式：
{
  "topicTitle": "${topic}",
  "estimatedDuration": "35秒",
  "scenes": [
    {
      "sceneIndex": 1,
      "timeRange": "00:00 - 00:03",
      "stage": "黄金前3秒截流",
      "visual": string,
      "spokenAudio": string,
      "onScreenText": string,
      "soundEffect": string
    },
    {
      "sceneIndex": 2,
      "timeRange": "00:03 - 00:10",
      "stage": "痛点放大与共情",
      "visual": string,
      "spokenAudio": string,
      "onScreenText": string,
      "soundEffect": string
    },
    {
      "sceneIndex": 3,
      "timeRange": "00:10 - 00:20",
      "stage": "解决方案与神器亮相",
      "visual": string,
      "spokenAudio": string,
      "onScreenText": string,
      "soundEffect": string
    },
    {
      "sceneIndex": 4,
      "timeRange": "00:20 - 00:28",
      "stage": "实测对比与打消疑虑",
      "visual": string,
      "spokenAudio": string,
      "onScreenText": string,
      "soundEffect": string
    },
    {
      "sceneIndex": 5,
      "timeRange": "00:28 - 00:35",
      "stage": "高转化行动号召(CTA)",
      "visual": string,
      "spokenAudio": string,
      "onScreenText": string,
      "soundEffect": string
    }
  ],
  "productionTips": {
    "digitalAvatarPrompt": string,
    "bgmSuggestion": string,
    "firstCommentSeed": string
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    const parsedData = JSON.parse(responseText);

    return res.status(200).json({
      success: true,
      source: 'gemini-3.8-flash',
      script: parsedData,
    });
  } catch (err: any) {
    console.error('Gemini script error:', err);
    return res.status(200).json({
      success: true,
      source: 'fallback',
      script: generateFallbackScript(req.body?.topic, req.body?.hook, req.body?.niche),
    });
  }
}
