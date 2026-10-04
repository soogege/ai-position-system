import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

// Initialize Google GenAI
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

// API Route: Generate TikTok Positioning Diagnosis
app.post('/api/diagnose', async (req, res) => {
  try {
    const { answers, userProfile } = req.body;

    if (!ai) {
      // Fallback response if API key not injected
      return res.json({
        success: true,
        source: 'fallback',
        data: generateFallbackDiagnosis(answers),
      });
    }

    const prompt = `你是一位专注马来西亚与新加坡华人市场的顶级 TikTok 算法专家与短视频变现导师“苏哥哥”。
请根据学员以下 10 道核心画像调研结果，为TA生成深度落地的定位诊断报告：
${JSON.stringify(answers, null, 2)}

请务必输出规范 JSON 格式，严格符合以下 schema：
{
  "matchScore": number (88到99之间的精准匹配百分比，如 98.4),
  "matchType": string (如 "高潜爆单型" / "同城裂变型" / "高客单私域型"),
  "oneSentencePositioning": string (如 "用 AI 数字人做“南洋家居好物种草”的不出镜带货号"),
  "positioningTags": string[] (3个标签),
  "mainPath": {
    "title": string,
    "tag": string (如 "主力转化"),
    "reason": string (结合马新本土市场、客单价、流量机制详细说明)
  },
  "altPath": {
    "title": string,
    "tag": string (如 "长尾厚利"),
    "reason": string
  },
  "accountNames": string[] (3个具有马新本土特色与爆款人设的账号名备选，如 "@南洋智享生活"),
  "bio": string (高转化主页 Bio 简介，包含利益点、信任状与行动指令),
  "personaTags": string[] (3个人设标签),
  "topTopics": [
    {
      "id": string,
      "tag": string (如 "对比避坑" / "反常识开箱" / "痛点揭秘"),
      "title": string (抓眼球爆款视频标题),
      "hook": string (前3秒黄金开口钩子台词)
    }
  ] (精选10条，必须涵盖前10条),
  "actionPlan": [
    { "week": "第 1 周", "title": string, "range": "0-14 条", "desc": string },
    { "week": "第 2 周", "title": string, "range": "15-28 条", "desc": string },
    { "week": "第 3 周", "title": string, "range": "29-42 条", "desc": string },
    { "week": "第 4 周", "title": string, "range": "43-56 条", "desc": string }
  ],
  "milestones": {
    "day30": { "target": string, "desc": string },
    "day90": { "target": string, "desc": string }
  },
  "pitfalls": string[] (最可能踩的3个本土实操坑点),
  "nextSteps": string[] (3个立刻行动指令)
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

    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Gemini diagnose error:', error);
    return res.json({
      success: true,
      source: 'fallback_error',
      data: generateFallbackDiagnosis(req.body.answers || {}),
      errorNote: error.message,
    });
  }
});

// API Route: Generate Detailed Video Script from Hook
app.post('/api/generate-script', async (req, res) => {
  try {
    const { topic, hook, niche, persona } = req.body;

    if (!ai) {
      return res.json({
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

    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      script: parsedData,
    });
  } catch (err: any) {
    console.error('Gemini script error:', err);
    return res.json({
      success: true,
      source: 'fallback',
      script: generateFallbackScript(req.body.topic, req.body.hook, req.body.niche),
    });
  }
});

// Fallback high-converting generator if Gemini is offline
function generateFallbackDiagnosis(answers: any) {
  const industry = answers.q2_industry || '南洋家居好物';
  const isFood = industry.includes('餐饮') || industry.includes('美食');
  const isMom = answers.q4_visual === '完全不出镜·AI数字人播报' || answers.q1_stage?.includes('宝妈');

  if (isFood) {
    return {
      matchScore: 96.8,
      matchType: '实体引流型',
      oneSentencePositioning: `「做“${industry}同城寻味探店与跨境新加坡周末客流”爆款引流号」`,
      positioningTags: ['马新双城客群', 'POI同城打卡', '私域包厢预订'],
      mainPath: {
        title: '主路径：TikTok POI 门店锚点 + 堂食专属暗号引流',
        tag: '同城获客',
        reason: '柔佛新山与吉隆坡餐饮极其依赖同城及新加坡周末跨境客，单条爆款视频挂载POI定位可直接拉升到店翻台率。',
      },
      altPath: {
        title: '备选路径：引流 WhatsApp 私域沉淀熟客与团餐宴席',
        tag: '长效复购',
        reason: '企业商务宴请、周末生日聚餐客单价突破 RM500+，通过私域建立常客特权群维持工作日营收。',
      },
      accountNames: ['@新山探味苏掌柜', '@狮城周末去哪吃', '@南洋舌尖实录'],
      bio: `带你吃透马新隐藏地道风味 🍜 | 凭视频到店报“苏哥哥”送招牌甜品 | 商务宴席/包厢预约看主页链接 📍`,
      personaTags: ['#主理人实景探店', '#新加坡越境客首选', '#真实不踩雷'],
      topTopics: [
        { id: '1', tag: '对比避坑', title: '《新加坡人周末去新山吃什么？这3家千万别踩雷》', hook: '“如果你周末来新山还只懂吃海鲜，这3秒给你省下RM300！”' },
        { id: '2', tag: '视觉诱惑', title: '《大厨揭秘：坚持28年传统老火熬制的招牌底料》', hook: '“每天清晨5点就要起锅熬汤，这碗汤凭什么让老饕甘愿排队1小时？”' },
        { id: '3', tag: '性价比王', title: '《人均RM25吃饱吃好的宝藏私房菜，连本地人都藏着吃》', hook: '“在市中心还能吃到人均RM20+的道地家常味，到底怎么做到的？”' },
        { id: '4', tag: '隐藏菜单', title: '《菜单上没有的3道隐藏菜，老顾客才知道怎么点！》', hook: '“来我们店别只看菜单，这3道隐藏招牌才是精髓！”' },
        { id: '5', tag: '出差党必看', title: '《在KL一个人不知道吃什么？本地人回购10次的救命档口》', hook: '“一个人吃饭最怕踩雷，这几家我一个人能吃3碗饭！”' },
        { id: '6', tag: '食材溯源', title: '《凌晨4点直采鲜货：老板坚持每日清盘的秘密》', hook: '“很多人问为什么肉质这么弹牙？因为隔夜货我们直接倒掉！”' },
        { id: '7', tag: '周末特惠', title: '《带家人来吃这桌团圆套餐，人均居然不到RM35？》', hook: '“一家人出来吃饭总是纠结？这套高性价比菜单直接抄作业！”' },
        { id: '8', tag: '同城打卡', title: '《这家店的复古南洋装潢太好拍了，出片率100%》', hook: '“想拍照又想吃好的，新山这家南洋老宅一定要收藏！”' },
        { id: '9', tag: '老火汤底', title: '《慢炖6小时才出这一锅，下雨天喝上一碗太治愈》', hook: '“今天降温下雨，没有比这锅滚烫的热汤更治愈的了！”' },
        { id: '10', tag: '粉丝福利', title: '《评论区扣1送招牌手作饮品：老板宠粉实录》', hook: '“看这条视频的粉丝到店，直接出示就能免费领一杯冷饮！”' },
      ],
      actionPlan: [
        { week: '第 1 周', title: '账号基建与同城POI打卡设置', range: '0-14 条', desc: '开通官方商业账号，配置准确 Google Map & TikTok POI 门店坐标，录制第一批菜品特写。' },
        { week: '第 2 周', title: '跨城引流钩子AB测试', range: '15-28 条', desc: '每周五、周六重点发布针对新加坡跨界客的周末探店视频，测试哪个钩子引流效果最猛。' },
        { week: '第 3 周', title: '爆款复刻与同城团购优惠', range: '29-42 条', desc: '将播放量最高的菜品打造成“到店必点王牌”，引导顾客拍摄二次传播打卡。' },
        { week: '第 4 周', title: '微付费Local Boost定向投放', range: '43-56 条', desc: '针对门店方圆15公里及新加坡出境口岸设置日投RM20，稳定提升周末到店客流。' },
      ],
      milestones: {
        day30: { target: '单条爆款引流 40+ 桌', desc: '打通从 TikTok 种草到店翻台闭环' },
        day90: { target: '月均新增到店客流 300+ 人', desc: '建立私域老客 VIP 预约矩阵' },
      },
      pitfalls: [
        '视频里没有清晰挂载本地 POI 锚点与具体交通指引',
        '只拍菜品大远景，没有诱人的热气腾腾声效与汁水细节特写',
        '没有设置清晰的到店暗号或粉丝专享福利',
      ],
      nextSteps: [
        '完善 TikTok 账号主页简介并绑定 Google Maps 导航',
        '使用手机微距模式拍摄招牌菜出锅的冒泡特写',
        '打印店面 TikTok 专属二维码贴在餐桌上吸引顾客打卡',
      ],
    };
  }

  return {
    matchScore: 98.4,
    matchType: '高潜爆单型',
    oneSentencePositioning: `「用 AI 数字人做“南洋家居好物种草”的不出镜带货号」`,
    positioningTags: ['马新区域客群', '低成本量产', '强视觉对比'],
    mainPath: {
      title: '主路径：TikTok Shop 橱窗挂车 + GMV Max 精准投流',
      tag: '主力转化',
      reason: '当前马新地区 TikTok Shop 家居品类货盘充足、客单价适中（RM20-60），用户即时冲动消费决策极快。数字人测评模板支持工业化起量，契合 GMV Max 自动定向ROI回流。',
    },
    altPath: {
      title: '备选路径：引流至 WhatsApp 私域做软装定制高客单',
      tag: '长尾厚利',
      reason: '若视频爆款评论区频繁出现“全屋定制”、“新房软装求推荐”等高意向线索，可沉淀私域提供套系解决方案（客单价 RM800+），抗周期性极强。',
    },
    accountNames: ['@南洋智享生活', '@AI挑物苏师傅', '@狮城好物指南'],
    bio: '专注马新高性价比家居 | AI实测避坑不交智商税 | 每天一条懒人整理神器 📦 橱窗好物直邮马新',
    personaTags: ['#不出镜技术流', '#马新高性价比', '#真实测评实战'],
    topTopics: [
      { id: '1', tag: '对比避坑', title: '《别再买这种拖把了！3个马新租房党必看踩雷清单》', hook: '“如果你在马来西亚租房，先别急着买拖把，看我这3秒你省下RM200！”' },
      { id: '2', tag: '反常识开箱', title: '《RM19搞定厨房油污？AI数字人实测实录》', hook: '“很多人问我为什么不出镜还能月入过万？就是靠这款爆单神器...”' },
      { id: '3', tag: '痛点揭秘', title: '《新山/KL主妇都在抢的收纳黑科技》', hook: '“你家衣柜总是乱糟糟？试试这个隐藏折叠法...”' },
      { id: '4', tag: '生活黑客', title: '《90%的人都不知道的浴室防霉技巧》', hook: '“马新常年雨季浴室长黑斑？用这个神物喷一喷立马擦净！”' },
      { id: '5', tag: '好物测评', title: '《不用打孔的窗帘伸缩杆，租房退租不扣押金》', hook: '“房东不给钻墙？教你一招5分钟无痕装窗帘！”' },
      { id: '6', tag: '桌面美学', title: '《RM30打造极简高效电竞与办公桌面》', hook: '“乱七八糟的充电线逼死强迫症？这个隐形收纳槽太绝了！”' },
      { id: '7', tag: '宝妈推荐', title: '《带娃妈妈必备：自动辅食研磨机实测》', hook: '“每天做辅食花1小时？有了这个只要15秒！”' },
      { id: '8', tag: '省钱攻略', title: '《Shopee vs TikTok Shop 哪家收纳箱更划算？》', hook: '“同样一款透明收纳箱，价钱居然差了一半？比给你看！”' },
      { id: '9', tag: '断舍离', title: '《丢掉这5样东西，屋子空间瞬间大一倍》', hook: '“屋子小不是你的错，是这5样垃圾占满了你的客厅！”' },
      { id: '10', tag: '急救清洁', title: '《白鞋发黄洗不掉？老鞋匠教我这招3分钟翻新》', hook: '“先别急着扔掉发黄的小白鞋，抹上它比新买的还白！”' },
    ],
    actionPlan: [
      { week: '第 1 周', title: '基建搭建与数字人模型调优', range: '0-14 条', desc: '注册并完善马新 TikTok Shop 橱窗权限；选定 1 个数字人声音音色，跑通“文案提取 - HeyGen数字人生成 - 剪映加BGM与花字”流水线。' },
      { week: '第 2 周', title: '冷启动测款与钩子AB测试', range: '15-28 条', desc: '每天固定上午11:30和晚间8:00各发1条。聚焦“厨房收纳”与“租房清洁”双类目，测试哪类前3秒钩子能跨越 500 播放新手池。' },
      { week: '第 3 周', title: '爆款复刻与首单变现闭环', range: '29-42 条', desc: '抓取数据高于中位数 300% 的视频模板，微调前 3 秒镜头，进行 1:3 变体批量投放；全面挂车小黄车，力争完成首笔佣金入账。' },
      { week: '第 4 周', title: '微付费投放放量 (GMV Max)', range: '43-56 条', desc: '对产生自然转化的视频追加小额定向推流（RM15-30/天），放大转化漏斗，固化成型 SOP。' },
    ],
    milestones: {
      day30: { target: '50,000+ 播放', desc: '突破 5 万播放，拿下首单 TikTok Shop 佣金收益' },
      day90: { target: 'RM 3k-5k', desc: '月净收益稳达 RM3,000–5,000，跑顺自动化飞轮' },
    },
    pitfalls: [
      '数字人机械感过重：切勿全程只用一张正面大头，必须每 3-4 秒穿插局部高清空镜或使用画中画贴图。',
      '未做好马新本地化表达：避免照搬国内俚语，多用 RM 标价体系与马新买家高频词（如“Senang”、“超值”、“必入”）。',
      '搬运混剪被判定低质：必须经过二创调色、镜面翻转与 AI 生成专属语音，不可直接搬运未经洗稿的素材。',
    ],
    nextSteps: [
      '点击上方复制账号名与 Bio 简介，更新你的 TikTok 新账号资料。',
      '根据第 1 条爆款选题，录入产品核心卖点，一键生成完整带货分镜脚本。',
      '备好 3 款马新热销收纳神器样本，随时准备开干！',
    ],
  };
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

// Development with Vite or Production build serve
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
