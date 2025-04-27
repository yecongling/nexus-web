import { create } from 'zustand';
import { persist, type PersistOptions } from 'zustand/middleware';

// 定义用户信息的store
interface UserState {
  loginUser: string;
  isLogin: boolean;
  homePath: string;
  token: string;
  role: string;
  login: (
    loginUser: string,
    token: string,
    role: string,
  ) => void;
  logout: () => void;
  setHomePath: (homePath: string) => void;
}

// 创建用户信息的store
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      loginUser: '',
      isLogin: false,
      homePath: '/home',
      token: '',
      role: '',
      login: (loginUser = '', token = '', role = '') =>
        set({ loginUser, isLogin: true, token, role }),
      logout: () =>
        set({
          loginUser: '',
          isLogin: false,
          homePath: '/home',
          token: '',
          role: '',
        }),
      setHomePath: (homePath: string) => set({ homePath }),
    }),
    {
      name: 'user-storage', // 保存到 localStorage 的 key
      getStorage: () => localStorage,
    } as PersistOptions<UserState>, // 类型定义
  ),
);
