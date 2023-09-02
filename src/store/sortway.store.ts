import { create } from 'zustand';

interface SortWayType {
  sortWay: '최신순' | '추천순';
  setLatest: () => void;
  setPopular: () => void;
}

const useSortWayStore = create<SortWayType>(set => ({
  sortWay: '추천순',
  setLatest: () => set({ sortWay: '최신순' }),
  setPopular: () => set({ sortWay: '추천순' }),
}));

export default useSortWayStore;
