interface LabelProps {
  children: React.ReactNode;
  name: string;
  size: string;
  labelStyle?: string;
  type?: string;
}

export const Label = ({ children, name, size, labelStyle, type = 'input' }: LabelProps) => {
  const labelSize = size === 'base' ? 'text-base' : 'text-lg';
  const labelType = type === 'input' ? '' : 'text-nagative text-sm';
  return (
    <label className={`leading-[25.2px] text-x font-medium ${labelType} ${labelSize} ${labelStyle}`} htmlFor={`${name}`}>
      {children}
    </label>
  );
};

// 로그인, 회원가입에서 라벨 사이즈=> base / 그 외 => lg
