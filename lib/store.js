import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Global app store for user state and preferences
export const useAppStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      userRole: null, // 'student', 'lecturer', 'class-rep'
      
      // UI state
      sidebarOpen: true,
      mobileNavOpen: false,
      
      // Attendance state
      currentSession: null,
      attendanceHistory: [],
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setUserRole: (role) => set({ userRole: role }),
      logout: () => set({ user: null, isAuthenticated: false, userRole: null }),
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
      
      setCurrentSession: (session) => set({ currentSession: session }),
      addAttendanceRecord: (record) => set((state) => ({
        attendanceHistory: [record, ...state.attendanceHistory]
      })),
    }),
    {
      name: 'presently-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userRole: state.userRole,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

// Notification store
export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      { id: Date.now(), timestamp: new Date(), read: false, ...notification },
      ...state.notifications
    ],
    unreadCount: state.unreadCount + 1
  })),
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id && !n.read ? { ...n, read: true } : n
    ),
    unreadCount: state.notifications.find(n => n.id === id && !n.read) 
                 ? Math.max(0, state.unreadCount - 1) 
                 : state.unreadCount
  })),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  })),
  
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));