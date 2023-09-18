import React from 'react';

import DaumPostcode from 'react-daum-postcode';

import usePostCodeStore from '@/store/post-code.store';

export interface PostCode {
  address: string;
  zonecode: string;
}

function PostCode({ setIsPostCodeOpen }: { setIsPostCodeOpen: React.Dispatch<React.SetStateAction<Boolean>> }) {
  const { setAddress } = usePostCodeStore();

  const handleComplete = (data: PostCode) => {
    const fullAddress = { address: data.address, zonecode: data.zonecode };
    setAddress(fullAddress);
  };

  const handleClose = (state: string) => {
    if (state === 'COMPLETE_CLOSE') {
      setIsPostCodeOpen(false);
    }
  };

  return (
    <div>
      <DaumPostcode onComplete={data => handleComplete(data)} onClose={state => handleClose(state)} />
    </div>
  );
}

export default PostCode;
