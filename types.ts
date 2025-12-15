export type GameState = 'INTRO' | 'PLAYING' | 'REVEAL' | 'ERROR';

export interface LevelProps {
  onComplete: () => void;
  isActive: boolean;
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export enum RevealType {
  LOCATION = 'LOCATION',
  RIDDLE = 'RIDDLE'
}

export interface GeminiResponse {
  text: string;
}
