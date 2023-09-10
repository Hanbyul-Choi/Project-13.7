import React from 'react';

type ButtonProps = {
  children: string | React.ReactNode;
  btnType: string;
  size?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  rounded?: boolean;
  buttonStyle?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, btnType, size = 'medium', onClick, rounded, buttonStyle, disabled }) => {
  let buttonSize = '';
  let buttonType = '';
  let buttonRounded = 'rounded-lg';
  let buttonDefault =
    'cursor-pointer flex gap-1 items-center whitespace-nowrap justify-center box-border font-semibold transition ease-in-out duration-300 font-regular hover:box-border';
  if (rounded) buttonRounded = 'rounded-full';

  switch (size) {
    case 'full':
      buttonSize = 'w-full py-4 text-lg ';
      break;
    case 'large':
      buttonSize = 'text-sm px-[0.1875rem] py-1 sm:px-[2rem] sm:py-2 sm:px-[1.875rem] sm:text-base md:text-[1.25rem]';
      break;
    case 'large-mo':
      buttonSize = 'px-[1.875rem] py-2 text-[1rem]';
      break;
    case 'medium':
      buttonSize = 'px-[1.875rem] py-2 text-base';
      break;
    case 'small':
      buttonSize = 'px-[1.375rem] py-1 text-base';
      break;
    case 'xsmall':
      buttonSize = 'px-[0.1875rem] py-1 text-sm';
      break;
  }

  switch (btnType) {
    case 'primary':
      buttonType = 'bg-blue text-white border border-blue hover:bg-[#d4e0f9] hover:border hover:border-solid hover:border-blue hover:text-blue ';
      break;
    case 'green':
      buttonType = 'bg-green text-white border border-green hover:bg-[#dbf1e9] hover:border hover:border-solid hover:border-green hover:text-green ';
      break;
    case 'borderBlack':
      buttonType = 'bg-black bg-white border border-black hover:bg-black hover:text-white';
      break;
    case 'black':
      buttonType = 'bg-black border border-black text-white hover:bg-lightblack hover:text-black';
      break;
    case 'cancel':
      buttonType = 'bg-white text-blue';
      break;
  }

  if (disabled) {
    buttonDefault = 'bg-sub6 text-sub7';
    buttonType = '';
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${buttonDefault} ${buttonSize} ${buttonRounded} ${buttonType} ${buttonStyle}`}>
      {children}
    </button>
  );
};
