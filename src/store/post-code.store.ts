import { create } from 'zustand';

import type { PostCode } from '@/components/common/PostCode/PostCode';

interface PostCodeType {
  address: string;
  zoneCode: string;
  setAddress: (postCode: PostCode) => void;
}

const usePostCodeStore = create<PostCodeType>(set => ({
  address: '',
  zoneCode: '',
  setAddress: postCode => {
    set({ address: postCode.address, zoneCode: postCode.zonecode });
  },
}));

export default usePostCodeStore;
