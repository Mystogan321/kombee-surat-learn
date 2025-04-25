
// User Roles
export type UserRole = 'employee' | 'intern' | 'mentor' | 'hr_admin' | 'team_lead';

// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  joinDate?: string;
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Permission Types
export type Permission = 
  | 'view_courses'
  | 'enroll_courses'
  | 'create_courses'
  | 'edit_courses'
  | 'delete_courses'
  | 'view_users'
  | 'manage_users'
  | 'view_reports'
  | 'create_assessments'
  | 'take_assessments'
  | 'grade_assessments'
  | 'view_all_progress';

// Content Types
export type ContentType = 'video' | 'document' | 'presentation' | 'link' | 'quiz' | 'assignment';

// Course Related Types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: number; // in minutes
  modules: Module[];
  enrolledUsers?: number;
  averageRating?: number;
  tags?: string[];
  level?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  contentType: ContentType;
  content: string; // URL or content ID
  duration?: number; // in minutes
  order: number;
  isCompleted?: boolean;
}

// Assessment Related Types
export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Option {
  id: string;
  text: string;
}

export interface Assessment {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  passingScore: number; // percentage
  attempts?: number; // max attempts allowed
  courseId?: string;
  moduleId?: string;
  lessonId?: string;
}

// Progress Tracking
export interface Progress {
  userId: string;
  courseId: string;
  completedLessons: string[]; // lesson IDs
  lastAccessed: string;
  assessmentResults: AssessmentResult[];
  percentComplete: number;
}

export interface AssessmentResult {
  assessmentId: string;
  score: number;
  passed: boolean;
  completedAt: string;
  timeSpent: number; // in seconds
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

// Notification Type
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
}

// Dashboard Analytics
export interface UserAnalytics {
  userId: string;
  enrolledCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  averageAssessmentScore: number;
  totalLearningTime: number; // in minutes
  certificatesEarned: number;
}
