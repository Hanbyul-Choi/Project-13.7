import type { UpdateUserData } from './JoinChallengeModal';
import type { UseFormRegister } from 'react-hook-form';

export default function useInputRegister(register: UseFormRegister<UpdateUserData>) {
  const nameNumRegister = register('name', { required: '이름은 필수 입력사항입니다.' });
  const phoneNumRegister = register('phone', {
    required: '휴대폰 번호는 필수 입력사항입니다.',
    pattern: { value: /^[0-9]+$/, message: '숫자만 입력해주세요. ex)01012345678' },
  });
  const addressNumRegister = register('address', { required: '상세주소는 필수 입력사항입니다.' });

  return { nameNumRegister, phoneNumRegister, addressNumRegister };
}
