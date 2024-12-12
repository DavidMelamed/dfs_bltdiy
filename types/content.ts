export interface ContentAnalysisParams {
  content: string;
  language?: string;
  mode?: 'html' | 'text';
}

export interface ContentInfo {
  word_count: number;
  sentence_count: number;
  paragraph_count: number;
  avg_word_length: number;
  avg_sentence_length: number;
  keywords: Array<{
    keyword: string;
    count: number;
    density: number;
  }>;
}

export interface ContentAnalysisResult {
  readability: {
    score: number;
    grade_level: string;
    reading_time: number;
  };
  sentiment: {
    score: number;
    type: string;
  };
  content_info: ContentInfo;
}
