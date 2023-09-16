'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  _size: string;
  type?: string;
  inputStyle?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps & InputHTMLAttributes<HTMLInputElement>>(
  ({ _size, onChange, type, name = '', inputStyle, ...props }, ref) => {
    let inputSize: string = '';
    const inputDefault = 'rounded-lg font-normal text-base border border-opacityblack outline-none ';
    const sizeFunc = () => {
      switch (_size) {
        case 'xs':
          return (inputSize = 'w-[200px] h-[2rem] py-3 px-2');
        case 'sm':
          return (inputSize = 'w-[280px] h-[3rem] py-3 px-4 sm:w-[388px]');
        case 'md':
          return (inputSize = 'w-[75%] h-[2.5rem] py-1 px-2 sm:h-[3rem] sm:py-3 sm:px-4 md:w-[473px] md:h-[51px] md:py-[12px] md:px-[40px]');
        case 'lg':
          return (inputSize = 'w-[543px] py-[8px] px-[24px]');
        case 'full':
          return (inputSize = 'w-full py-2 px-6 sm:ml-[20px]');
      }
    };
    sizeFunc();
    return <input type={type} className={`${inputDefault} ${inputSize}  ${inputStyle}`} name={name} onChange={onChange} ref={ref} {...props} />;
  },
);
Input.displayName = 'Input';

// width 기준으로 사이즈 지정 / 로그인폼 => sm / 댓글=> md / post title, content => lg
