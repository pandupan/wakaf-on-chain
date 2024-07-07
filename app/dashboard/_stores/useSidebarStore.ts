import create from 'zustand'

interface SidebarState {
  isOpen: boolean;
  notificationDisplay: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  toggleNotificationDisplay: () => void;
  closeNotificationDisplay: () => void;
  openNotificationDisplay: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  notificationDisplay: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
  toggleNotificationDisplay: () => set((state) => ({ notificationDisplay: !state.notificationDisplay })),
  closeNotificationDisplay: () => set({ notificationDisplay: false }),
  openNotificationDisplay: () => set({ notificationDisplay: true }),
}));

export default useSidebarStore;
