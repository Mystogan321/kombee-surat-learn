
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
import { mockUsers } from '@/lib/mockData';

// Mock API delay
const simulateApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(800);
      
      // Mock auth logic - in a real app this would be an API call
      const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return rejectWithValue('Invalid credentials');
      }
      
      // In a real app, password would be checked against a hashed version
      if (password !== 'password') { // Mock password check
        return rejectWithValue('Invalid credentials');
      }
      
      // Generate mock token
      const token = `mock-jwt-token-${Math.random().toString(36).substr(2, 10)}`;
      
      // Save token to localStorage for persistence
      localStorage.setItem('kombee_token', token);
      localStorage.setItem('kombee_user', JSON.stringify(user));
      
      return { user, token };
    } catch (error) {
      return rejectWithValue('Authentication failed');
    }
  }
);

// Check auth status thunk
export const checkAuthStatus = createAsyncThunk(
  'auth/status',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(300);
      
      // Check for token and user in localStorage
      const token = localStorage.getItem('kombee_token');
      const storedUser = localStorage.getItem('kombee_user');
      
      if (!token || !storedUser) {
        return rejectWithValue('Not authenticated');
      }
      
      const user = JSON.parse(storedUser) as User;
      return { user, token };
    } catch (error) {
      localStorage.removeItem('kombee_token');
      localStorage.removeItem('kombee_user');
      return rejectWithValue('Authentication check failed');
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout', 
  async () => {
    // Remove tokens from localStorage
    localStorage.removeItem('kombee_token');
    localStorage.removeItem('kombee_user');
    
    // Simulate API delay
    await simulateApiDelay(300);
    
    return true;
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;
