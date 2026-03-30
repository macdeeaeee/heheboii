export enum ExerciseType {
  TIMER = 'TIMER',
  REPS = 'REPS'
}

export type AnimationType = 
  | 'chin-lift' 
  | 'chin-tuck' 
  | 'tongue-press' 
  | 'jaw-release' 
  | 'neck-tilt' 
  | 'shoulder-roll' 
  | 'static';

export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum Category {
  WARMUP = 'Warm-up',
  JAWLINE = 'Jawline',
  MEWING = 'Mewing',
  POSTURE = 'Posture',
  COOLDOWN = 'Cooldown'
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  durationSeconds?: number; // For TIMER type
  targetReps?: number;     // For REPS type
  type: ExerciseType;
  category: Category;
  animationType: AnimationType; // Changed from imageUrl
  safetyNote?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  durationDays: number;
  exercises: string[]; // List of Exercise IDs
  colorFrom: string;
  colorTo: string;
}

export interface UserProgress {
  completedSessions: number;
  streak: number;
  lastSessionDate: string | null;
  mewingStreak: number;
  lastMewingCheckIn: string | null;
  selectedPersona: string | null;
  history: {
    date: string;
    programId: string;
    duration: number;
  }[];
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  habits: string[];
  tips: string[];
}

export interface Look {
  id: string;
  name: string;
  postureCues: string[];
  groomingActions: string[];
  outfitIdea: string;
}