'use client'

import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  _size: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  _size,
  onChange,
  type,
  ...props
}: InputProps) => {
  let inputSize: string = ''


  const inputDefault = 'rounded-lg font-normal text-base border-2 border-opacityblack outline-none ';
  const sizeFunc = () => {
    switch (_size) {
      case 'sm':
        return (inputSize = 'w-[388px] h-[3rem]');
      case 'md':
        return (inputSize = 'w-[473px] h-[51px] py-[12px] px-[40px]');
      case 'lg':
        return (inputSize = 'w-[543px] py-[8px] px-[8px]');
    }
  };
  sizeFunc();
  return (
    <input
      type={type}
      className={`${inputDefault} ${inputSize} `}
      onChange={onChange}
      {...props}
    />
  );
};

// width 기준으로 사이즈 지정 / 로그인폼 => sm / 댓글=> md / post title, content => lg
