'use client';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { Button, Label, useDialog } from '@/components/common';
import InputForm from '@/components/common/InputForm';
import { useModalStore } from '@/store/modal.store';

import { supabase } from '../../../../supabase/supabaseConfig';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

interface SignUpUser {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export default function SignUpForm() {
  const { Alert } = useDialog();
  const { closeModal } = useModalStore();
  const [disableBtn, setDisableBtn] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { email, password, nickname, passwordConfirm } = watch();

  useEffect(() => {
    if (!email && !password) return;
    if (email.trim() !== '' && password.trim() !== '' && nickname.trim() !== '' && passwordConfirm.trim() !== '') {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [email, password, nickname, passwordConfirm]);

  const signUpHandler: SubmitHandler<SignUpUser | FieldValues> = async ({ email, password, nickname, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      return setError('passwordConfirm', { message: '비밀번호가 일치하지 않습니다.' }, { shouldFocus: true });
    }
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(authError);
    let uid = authData.user?.id;
    if (authError) {
      if (authError?.message === 'invalid format') {
        return Alert('이메일 형태가 올바르지 않습니다.');
      } else if (authError.message === 'User already registered') {
        return Alert('이미 가입된 계정입니다.');
      }
    }

    if (!uid) return;
    const { error: dbError } = await supabase.from('users').insert({ user_id: uid, email, nickname });

    if (dbError) {
      return Alert('오류가 발생했습니다.', '잠시후 다시 시도해주세요.');
    }
    closeModal();
    return Alert('회원가입이 정상적으로 처리되었습니다.');
  };

  return (
    <>
      <h1 className="mb-10">Sign Up 👋</h1>
      <form onSubmit={handleSubmit(signUpHandler)} className="flex flex-col gap-y-4">
        <Label name={'nickname'} size={'base'}>
          닉네임
        </Label>
        <InputForm
          type="text"
          autoFocus
          _size="sm"
          name="nickname"
          maxLength={10}
          placeholder="닉네임을 입력하세요"
          register={register}
          errors={errors}
          rules={{ required: '필수 입력입니다' }}
        />
        <Label name={'email'} size={'base'}>
          이메일
        </Label>
        <InputForm
          type="email"
          _size={'sm'}
          name="email"
          placeholder="example@email.com"
          register={register}
          errors={errors}
          rules={{ required: '필수 입력입니다', pattern: { value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, message: '이메일 형식이 아닙니다.' } }}
        />
        <Label name={'password'} size={'base'}>
          비밀번호
        </Label>
        <InputForm
          type="password"
          placeholder="비밀번호"
          name="password"
          _size="sm"
          register={register}
          errors={errors}
          rules={{ required: '필수 입력입니다' }}
        />
        <Label name={'passwordConfirm'} size={'base'}>
          비밀번호 확인
        </Label>
        <InputForm
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          _size="sm"
          register={register}
          errors={errors}
          rules={{ required: '필수 입력입니다' }}
        />
        <Button type="submit" btnType={'primary'} size="full" buttonStyle="mt-8" disabled={disableBtn}>
          회원가입
        </Button>
      </form>
    </>
  );
}
