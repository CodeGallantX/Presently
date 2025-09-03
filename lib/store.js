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
      
      // Account Setup Details
      matriculationNumber: null,
      department: null,
      level: null,
      digitalSignature: null,
      staffId: null,
      coursesTaught: null, // Array of strings
      assignedCourses: null, // Array of strings
      assignedLecturer: null, // Email or ID

      // Permissions & Preferences
      locationAccessGranted: false,
      notificationsEnabled: false,
      darkModePreference: true, // Default to dark mode

      // App Preferences
      defaultDashboardView: 'attendance', // 'attendance', 'analytics', 'courses'
      timeFormatPreference: '12h', // '12h', '24h'
      remindBeforeClass: false,
      remindDaily: false,
      remindWeekly: false,
      
      // UI state
      sidebarOpen: true,
      mobileNavOpen: false,
      
      // Attendance state
      currentSession: null,
      attendanceHistory: [],

      // Hydration state
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setUserRole: (role) => set({ userRole: role }),
      logout: () => set({ user: null, isAuthenticated: false, userRole: null,
        matriculationNumber: null, department: null, level: null, digitalSignature: null,
        staffId: null, coursesTaught: null, assignedCourses: null, assignedLecturer: null,
        locationAccessGranted: false, notificationsEnabled: false, darkModePreference: true,
      }),
      
      setMatriculationNumber: (num) => set({ matriculationNumber: num }),
      setDepartment: (dept) => set({ department: dept }),
      setLevel: (lvl) => set({ level: lvl }),
      setDigitalSignature: (sig) => set({ digitalSignature: sig }),
      setStaffId: (id) => set({ staffId: id }),
      setCoursesTaught: (courses) => set({ coursesTaught: courses }),
      setAssignedCourses: (courses) => set({ assignedCourses: courses }),
      setAssignedLecturer: (lecturer) => set({ assignedLecturer: lecturer }),

      setLocationAccessGranted: (granted) => set({ locationAccessGranted: granted }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setDarkModePreference: (dark) => set({ darkModePreference: dark }),

      setDefaultDashboardView: (view) => set({ defaultDashboardView: view }),
      setTimeFormatPreference: (format) => set({ timeFormatPreference: format }),
      setRemindBeforeClass: (remind) => set({ remindBeforeClass: remind }),
      setRemindDaily: (remind) => set({ remindDaily: remind }),
      setRemindWeekly: (remind) => set({ remindWeekly: remind }),

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
      onRehydrateStorage: () => (state) => {
        state.setHydrated();
      }
    }
  )
);

// Notification store
export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      { id: Date.now(), timestamp: new Date(), read: false, source: notification.source || 'System', category: notification.category || 'General', ...notification },
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