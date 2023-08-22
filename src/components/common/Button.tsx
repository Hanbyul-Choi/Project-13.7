import React from 'react';

type ButtonProps = {
  children: string | React.ReactNode;
  btnType: string;
  size: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  rounded?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, btnType, size, onClick, rounded }) => {
  let buttonSize = '';
  let buttonType = '';
  let buttonRounded = 'rounded-lg';

  if (rounded) buttonRounded = 'rounded-full';

  switch (size) {
    case 'full':
      buttonSize = 'w-full py-4 text-lg';
      break;
    case 'large':
      buttonSize = 'px-8 py-2 text-xl';
      break;
    case 'small':
      buttonSize = 'px-6 py-2 text-base';
      break;
  }

  switch (btnType) {
    case 'primary':
      buttonType = 'bg-blue text-white border border-blue hover:bg-[#d4e0f9] hover:border hover:border-solid hover:border-blue hover:text-blue ';
      break;
    case 'green':
      buttonType = 'bg-green text-white border border-green hover:bg-[#dbf1e9] hover:border hover:border-solid hover:border-green hover:text-green ';
      break;
    case 'black':
      buttonType = 'bg-white border border-black hover:bg-black hover:text-white';
      break;
  }

  return (
    <button onClick={onClick} className={`cursor-pointer flex gap-1 items-center box-border font-semibold transition ease-in-out duration-300 hover:box-border ${buttonSize} ${buttonRounded} ${buttonType}`}>
      {children}
    </button>
  );
};

export default Button;
