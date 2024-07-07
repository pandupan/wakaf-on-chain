import create from 'zustand'

interface SidebarState {
  isOpen: boolean;
  notificationDisplay: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  toggleNotification: () => void;
  onOpenNotification: (open: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  notificationDisplay: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
  toggleNotification: () => set((state) => ({ notificationDisplay: !state.notificationDisplay })),
  onOpenNotification: (open) => set({ notificationDisplay: open }),
}));

export default useSidebarStore;
