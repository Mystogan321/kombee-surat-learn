
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Course, Module, Lesson } from '@/types';
import { mockCourses } from '@/lib/mockData';

// Mock API delay
const simulateApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface CoursesState {
  courses: Course[];
  currentCourse: Course | null;
  currentModule: Module | null;
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CoursesState = {
  courses: [],
  currentCourse: null,
  currentModule: null,
  currentLesson: null,
  loading: false,
  error: null,
};

// Fetch all courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(800);
      
      // Return mock courses
      return mockCourses;
    } catch (error) {
      return rejectWithValue('Failed to fetch courses');
    }
  }
);

// Fetch single course
export const fetchCourseById = createAsyncThunk(
  'courses/fetchById',
  async (courseId: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(500);
      
      // Find course by ID
      const course = mockCourses.find(c => c.id === courseId);
      
      if (!course) {
        return rejectWithValue('Course not found');
      }
      
      return course;
    } catch (error) {
      return rejectWithValue('Failed to fetch course');
    }
  }
);

// Fetch module by ID
export const fetchModuleById = createAsyncThunk(
  'courses/fetchModuleById',
  async ({ courseId, moduleId }: { courseId: string; moduleId: string }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(300);
      
      // Find course by ID
      const course = mockCourses.find(c => c.id === courseId);
      
      if (!course) {
        return rejectWithValue('Course not found');
      }
      
      // Find module by ID
      const module = course.modules.find(m => m.id === moduleId);
      
      if (!module) {
        return rejectWithValue('Module not found');
      }
      
      return { module, course };
    } catch (error) {
      return rejectWithValue('Failed to fetch module');
    }
  }
);

// Fetch lesson by ID
export const fetchLessonById = createAsyncThunk(
  'courses/fetchLessonById',
  async ({ 
    courseId, 
    moduleId, 
    lessonId 
  }: { 
    courseId: string; 
    moduleId: string; 
    lessonId: string;
  }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(300);
      
      // Find course by ID
      const course = mockCourses.find(c => c.id === courseId);
      
      if (!course) {
        return rejectWithValue('Course not found');
      }
      
      // Find module by ID
      const module = course.modules.find(m => m.id === moduleId);
      
      if (!module) {
        return rejectWithValue('Module not found');
      }
      
      // Find lesson by ID
      const lesson = module.lessons.find(l => l.id === lessonId);
      
      if (!lesson) {
        return rejectWithValue('Lesson not found');
      }
      
      return { lesson, module, course };
    } catch (error) {
      return rejectWithValue('Failed to fetch lesson');
    }
  }
);

// Courses slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCoursesError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
      state.currentModule = null;
      state.currentLesson = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.currentCourse = action.payload;
        state.currentModule = null;
        state.currentLesson = null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch module by ID
      .addCase(fetchModuleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModuleById.fulfilled, (state, action: PayloadAction<{ module: Module; course: Course }>) => {
        state.loading = false;
        state.currentCourse = action.payload.course;
        state.currentModule = action.payload.module;
        state.currentLesson = null;
      })
      .addCase(fetchModuleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch lesson by ID
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonById.fulfilled, (state, action: PayloadAction<{ lesson: Lesson; module: Module; course: Course }>) => {
        state.loading = false;
        state.currentCourse = action.payload.course;
        state.currentModule = action.payload.module;
        state.currentLesson = action.payload.lesson;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCoursesError, clearCurrentCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
