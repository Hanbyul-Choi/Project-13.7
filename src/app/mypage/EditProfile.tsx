import React from 'react';

import Button from '@/components/common/Button';

const EditProfile: React.FC = () => {
  return (
    <div className="">
      <h3>프로필 수정</h3>
      <Button btnType={'primary'} size={'full'}>
        저장하기
      </Button>
    </div>
  );
};

export default EditProfile;
