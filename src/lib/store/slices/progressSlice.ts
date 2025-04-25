
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Progress } from '@/types';
import { mockProgress } from '@/lib/mockData';

// Mock API delay
const simulateApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ProgressState {
  userProgress: Progress[];
  currentProgress: Progress | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProgressState = {
  userProgress: [],
  currentProgress: null,
  loading: false,
  error: null,
};

// Fetch user progress
export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (userId: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(600);
      
      // Return mock progress
      // In a real app, we'd filter progress by userId from API
      if (mockProgress.userId === userId) {
        return [mockProgress];
      }
      
      // Return empty array if no progress found
      return [];
    } catch (error) {
      return rejectWithValue('Failed to fetch user progress');
    }
  }
);

// Fetch course progress
export const fetchCourseProgress = createAsyncThunk(
  'progress/fetchCourseProgress',
  async ({ userId, courseId }: { userId: string; courseId: string }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(400);
      
      // Return mock progress for specific course
      if (mockProgress.userId === userId && mockProgress.courseId === courseId) {
        return mockProgress;
      }
      
      return rejectWithValue('Progress not found');
    } catch (error) {
      return rejectWithValue('Failed to fetch course progress');
    }
  }
);

// Mark lesson as completed
export const markLessonCompleted = createAsyncThunk(
  'progress/markLessonCompleted',
  async ({ 
    userId, 
    courseId, 
    lessonId 
  }: { 
    userId: string; 
    courseId: string; 
    lessonId: string;
  }, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(300);
      
      // Get state
      const state = getState() as { progress: ProgressState };
      const currentProgress = state.progress.currentProgress;
      
      if (!currentProgress) {
        return rejectWithValue('No current progress found');
      }
      
      // Create updated progress
      const updatedProgress = { ...currentProgress };
      
      // Don't add duplicate lesson IDs
      if (!updatedProgress.completedLessons.includes(lessonId)) {
        updatedProgress.completedLessons = [...updatedProgress.completedLessons, lessonId];
        
        // Recalculate percent complete (would be better with actual total lessons count)
        // This is simplified for the mock
        updatedProgress.percentComplete = Math.min(
          Math.round((updatedProgress.completedLessons.length / 10) * 100), // Assuming 10 lessons total
          100
        );
      }
      
      // Update last accessed
      updatedProgress.lastAccessed = new Date().toISOString();
      
      // In a real app, we'd save this to an API
      
      return updatedProgress;
    } catch (error) {
      return rejectWithValue('Failed to mark lesson as completed');
    }
  }
);

// Progress slice
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    resetProgressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user progress
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action: PayloadAction<Progress[]>) => {
        state.loading = false;
        state.userProgress = action.payload;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch course progress
      .addCase(fetchCourseProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseProgress.fulfilled, (state, action: PayloadAction<Progress>) => {
        state.loading = false;
        state.currentProgress = action.payload;
      })
      .addCase(fetchCourseProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Create empty progress if not found
        // This would typically be done with an API in a real app
      })
      
      // Mark lesson as completed
      .addCase(markLessonCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markLessonCompleted.fulfilled, (state, action: PayloadAction<Progress>) => {
        state.loading = false;
        state.currentProgress = action.payload;
        
        // Update in overall progress array too
        const index = state.userProgress.findIndex(p => 
          p.userId === action.payload.userId && p.courseId === action.payload.courseId
        );
        
        if (index !== -1) {
          state.userProgress[index] = action.payload;
        }
      })
      .addCase(markLessonCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProgressError } = progressSlice.actions;
export default progressSlice.reducer;
