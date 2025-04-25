
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/types';
import { mockNotifications } from '@/lib/mockData';

// Mock API delay
const simulateApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};

// Fetch user notifications
export const fetchUserNotifications = createAsyncThunk(
  'notifications/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(500);
      
      // Return mock notifications for user
      const userNotifications = mockNotifications.filter(n => n.userId === userId);
      return userNotifications;
    } catch (error) {
      return rejectWithValue('Failed to fetch notifications');
    }
  }
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await simulateApiDelay(300);
      
      // Get notifications state
      const state = getState() as { notifications: NotificationsState };
      
      // Find notification
      const notification = state.notifications.notifications.find(n => n.id === notificationId);
      
      if (!notification) {
        return rejectWithValue('Notification not found');
      }
      
      // Create updated notification
      const updatedNotification = { ...notification, isRead: true };
      
      // In a real app, we'd save this to an API
      
      return updatedNotification;
    } catch (error) {
      return rejectWithValue('Failed to mark notification as read');
    }
  }
);

// Notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch user notifications
    builder
      .addCase(fetchUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Mark notification as read
      .addCase(markNotificationAsRead.fulfilled, (state, action: PayloadAction<Notification>) => {
        const index = state.notifications.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      });
  },
});

export const { clearNotifications, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
