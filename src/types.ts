export interface QuestionOption {
  label: string;
  desc?: string;
  icon?: string;
  tag?: string;
}

export interface QuizQuestion {
  id: number;
  key: string;
  title: string;
  subtitle: string;
  category: string;
  coachTip: string;
  type: 'single' | 'input-with-pills';
  inputPlaceholder?: string;
  pills?: string[];
  options?: {
    id: string;
    title: string;
    desc: string;
    icon?: string;
    tag?: string;
  }[];
}

export interface TopicItem {
  id: string;
  tag: string;
  title: string;
  hook: string;
}

export interface ActionPlanWeek {
  week: string;
  title: string;
  range: string;
  desc: string;
}

export interface DiagnosisReport {
  id: string;
  createdAt: string;
  matchScore: number;
  matchType: string;
  oneSentencePositioning: string;
  positioningTags: string[];
  mainPath: {
    title: string;
    tag: string;
    reason: string;
  };
  altPath: {
    title: string;
    tag: string;
    reason: string;
  };
  accountNames: string[];
  bio: string;
  personaTags: string[];
  topTopics: TopicItem[];
  actionPlan: ActionPlanWeek[];
  milestones: {
    day30: { target: string; desc: string };
    day90: { target: string; desc: string };
  };
  pitfalls: string[];
  nextSteps: string[];
}

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  dateStr: string;
  status: 'completed' | 'draft';
  statusLabel: string;
  matchScore: number;
  tags: string[];
  previewImage: string;
  previewSubtext: string;
  assetCountText: string;
  targetMetrics: string;
  draftProgress?: number;
  draftSummary?: string;
  reportData?: DiagnosisReport;
}

export interface StudentRecord {
  id: string;
  name: string;
  englishName: string;
  email: string;
  registeredDate: string;
  role: 'student' | 'vip' | 'admin';
  personaType: 'store' | 'mom' | 'sidehustle';
  personaLabel: string;
  location: string;
  budget: string;
  avatarUrl: string;
  matchScore: number;
  latestDiagnosisTitle: string;
  latestDiagnosisSnippet: string;
  latencyText: string;
}

export interface ScriptScene {
  sceneIndex: number;
  timeRange: string;
  stage: string;
  visual: string;
  spokenAudio: string;
  onScreenText: string;
  soundEffect: string;
}

export interface VideoScript {
  topicTitle: string;
  estimatedDuration: string;
  scenes: ScriptScene[];
  productionTips: {
    digitalAvatarPrompt: string;
    bgmSuggestion: string;
    firstCommentSeed: string;
  };
}
