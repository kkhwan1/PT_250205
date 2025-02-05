// 운동 계획 관련 타입 정의
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance';
  targetMuscles: string[];
  equipment?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  imageUrl?: string;
}

export interface Set {
  id: string;
  reps?: number;
  weight?: number;
  duration?: number; // seconds
  distance?: number; // meters
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: Set[];
  order: number;
  notes?: string;
}

export interface Schedule {
  id: string;
  startDate: Date;
  endDate?: Date;
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  timeOfDay?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  exercises: WorkoutExercise[];
  schedule: Schedule;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  duration: number; // minutes
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface WorkoutLog {
  id: string;
  workoutPlanId: string;
  date: Date;
  exercises: {
    exerciseId: string;
    sets: Set[];
    notes?: string;
  }[];
  duration: number; // actual duration in minutes
  feeling: 'great' | 'good' | 'okay' | 'bad';
  notes?: string;
  userId: string;
} 