import React from 'react';

type ButtonProps = {
  children: string;
  btnType: string;
  size: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({ children, btnType, size, onClick }) => {
  let buttonSize = '';
  let buttonType = '';

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
      buttonType = 'bg-blue text-white rounded-lg border border-blue hover:bg-[#d4e0f9] hover:border hover:border-solid hover:border-blue hover:text-blue ';
      break;
    case 'green':
      buttonType = 'bg-green text-white rounded-[50px] border border-green hover:bg-[#dbf1e9] hover:border hover:border-solid hover:border-green hover:text-green ';
      break;
    case 'black':
      buttonType = 'bg-white rounded-[50px] border border-black hover:bg-black hover:text-white';
      break;
  }

  return (
    <button onClick={onClick} className={`cursor-pointer box-border font-semibold transition ease-in-out duration-700 hover:box-border ${buttonSize} ${buttonType}`}>
      {children}
    </button>
  );
};

export default Button;
