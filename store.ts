import { UserProgress } from './types';

const STORAGE_KEY = 'align_app_progress';

const DEFAULT_PROGRESS: UserProgress = {
  completedSessions: 0,
  streak: 0,
  lastSessionDate: null,
  mewingStreak: 0,
  lastMewingCheckIn: null,
  selectedPersona: null,
  history: []
};

export const getProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_PROGRESS;
  } catch (e) {
    return DEFAULT_PROGRESS;
  }
};

export const toggleMewingCheckIn = () => {
  const current = getProgress();
  const today = new Date().toISOString().split('T')[0];
  
  // If already checked in today, do nothing (or toggle off if we wanted complex logic, but let's keep it simple: stick to checking in)
  if (current.lastMewingCheckIn === today) return current;

  let newStreak = current.mewingStreak;
  
  if (current.lastMewingCheckIn) {
    const lastDate = new Date(current.lastMewingCheckIn);
    const nowDate = new Date(today);
    const diffTime = Math.abs(nowDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  const newProgress = {
    ...current,
    mewingStreak: newStreak,
    lastMewingCheckIn: today
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  return newProgress;
};

export const selectPersona = (personaId: string) => {
  const current = getProgress();
  const newProgress = {
    ...current,
    selectedPersona: personaId
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  return newProgress;
};

export const saveSession = (programId: string, duration: number) => {
  const current = getProgress();
  const today = new Date().toISOString().split('T')[0];
  
  let newStreak = current.streak;
  
  // Calculate Workout Streak
  if (current.lastSessionDate) {
    const lastDate = new Date(current.lastSessionDate);
    const nowDate = new Date(today);
    const diffTime = Math.abs(nowDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  const newProgress: UserProgress = {
    ...current,
    completedSessions: current.completedSessions + 1,
    streak: newStreak,
    lastSessionDate: today,
    history: [
      ...current.history,
      { date: today, programId, duration }
    ]
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  return newProgress;
};