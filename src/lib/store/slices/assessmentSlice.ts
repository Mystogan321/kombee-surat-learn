
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Assessment } from '@/types';
import { mockAssessment } from '@/lib/mockData';

// Mock API delay
const simulateApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Define a type for user answers to track during assessment
interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
}

interface AssessmentState {
  assessments: Assessment[];
  currentAssessment: Assessment | null;
  userAnswers: UserAnswer[];
  remainingTime: number | null;
  isStarted: boolean;
  isSubmitted: boolean;
  score: number | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AssessmentState = {
  assessments: [],
  currentAssessment: null,
  userAnswers: [],
  remainingTime: null,
  isStarted: false,
  isSubmitted: false,
  score: null,
  loading: false,
  error: null,
};

// Fetch assessment by ID
export const fetchAssessment = createAsyncThunk(
  'assessment/fetchById',
  async (assessmentId: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(600);
      
      // Return mock assessment
      if (mockAssessment.id === assessmentId) {
        return mockAssessment;
      }
      
      return rejectWithValue('Assessment not found');
    } catch (error) {
      return rejectWithValue('Failed to fetch assessment');
    }
  }
);

// Submit assessment answers
export const submitAssessment = createAsyncThunk(
  'assessment/submit',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(800);
      
      // Get assessment state
      const state = getState() as { assessment: AssessmentState };
      const { currentAssessment, userAnswers } = state.assessment;
      
      if (!currentAssessment) {
        return rejectWithValue('No current assessment found');
      }
      
      // Calculate score
      let correctAnswers = 0;
      
      userAnswers.forEach(answer => {
        const question = currentAssessment.questions.find(q => q.id === answer.questionId);
        if (question && question.correctOptionId === answer.selectedOptionId) {
          correctAnswers++;
        }
      });
      
      const totalQuestions = currentAssessment.questions.length;
      const scorePercentage = (correctAnswers / totalQuestions) * 100;
      
      // In a real app, we'd save the result to an API
      
      return {
        score: scorePercentage,
        passed: scorePercentage >= currentAssessment.passingScore,
        correctAnswers,
        totalQuestions,
      };
    } catch (error) {
      return rejectWithValue('Failed to submit assessment');
    }
  }
);

// Assessment slice
const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    startAssessment: (state, action: PayloadAction<Assessment>) => {
      state.currentAssessment = action.payload;
      state.userAnswers = [];
      state.isStarted = true;
      state.isSubmitted = false;
      state.score = null;
      
      // Set initial time if assessment has a time limit
      if (action.payload.timeLimit) {
        state.remainingTime = action.payload.timeLimit * 60; // Convert to seconds
      } else {
        state.remainingTime = null;
      }
    },
    updateRemainingTime: (state, action: PayloadAction<number>) => {
      state.remainingTime = action.payload;
    },
    answerQuestion: (state, action: PayloadAction<UserAnswer>) => {
      const { questionId, selectedOptionId } = action.payload;
      
      // Check if answer already exists
      const existingAnswerIndex = state.userAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex !== -1) {
        // Update existing answer
        state.userAnswers[existingAnswerIndex].selectedOptionId = selectedOptionId;
      } else {
        // Add new answer
        state.userAnswers.push({ questionId, selectedOptionId });
      }
    },
    resetAssessment: (state) => {
      state.currentAssessment = null;
      state.userAnswers = [];
      state.remainingTime = null;
      state.isStarted = false;
      state.isSubmitted = false;
      state.score = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch assessment by ID
    builder
      .addCase(fetchAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssessment.fulfilled, (state, action: PayloadAction<Assessment>) => {
        state.loading = false;
        state.assessments = [...state.assessments.filter(a => a.id !== action.payload.id), action.payload];
        state.currentAssessment = action.payload;
      })
      .addCase(fetchAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Submit assessment answers
      .addCase(submitAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAssessment.fulfilled, (state, action: PayloadAction<{
        score: number;
        passed: boolean;
        correctAnswers: number;
        totalQuestions: number;
      }>) => {
        state.loading = false;
        state.isSubmitted = true;
        state.score = action.payload.score;
      })
      .addCase(submitAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  startAssessment, 
  updateRemainingTime, 
  answerQuestion, 
  resetAssessment 
} = assessmentSlice.actions;
export default assessmentSlice.reducer;
