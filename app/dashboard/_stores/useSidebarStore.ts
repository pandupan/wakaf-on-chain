import create from 'zustand'

interface SidebarState {
  isOpen: boolean;
  notificationDisplay: boolean;
  unreadNotification: number;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  toggleNotification: () => void;
  onOpenNotification: (open: boolean) => void;
  setUnreadNotification: (count: number) => void;
  decrementUnreadNotification: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  notificationDisplay: false,
  unreadNotification: 0,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
  toggleNotification: () => set((state) => ({ notificationDisplay: !state.notificationDisplay })),
  onOpenNotification: (open) => set({ notificationDisplay: open }),
  setUnreadNotification: (count) => set({ unreadNotification: count }),
  decrementUnreadNotification: () => set((state) => ({ unreadNotification: state.unreadNotification - 1 }))
}));

export default useSidebarStore;
