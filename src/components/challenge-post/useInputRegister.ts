import type { UpdateUserData } from './JoinChallengeModal';
import type { UseFormRegister } from 'react-hook-form';

export default function useInputRegister(register: UseFormRegister<UpdateUserData>) {
  const nameRegister = register('name', { required: '이름은 필수 입력사항입니다.' });
  const phoneRegister = register('phone', {
    required: '휴대폰 번호는 필수 입력사항입니다.',
    pattern: { value: /^[0-9]+$/, message: '숫자만 입력해주세요. ex)01012345678' },
  });
  const addressRegister = register('address', { required: '주소는 필수 입력사항입니다.' });
  const zoneCodeRegister = register('zonecode', { required: '우편번호는 필수 입력사항입니다.' });
  const detailAddressRegister = register('detailAddress', { required: '상세주소는 필수 입력사항입니다.' });

  return { nameRegister, phoneRegister, addressRegister, detailAddressRegister, zoneCodeRegister };
}
