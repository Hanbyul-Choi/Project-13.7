interface LabelProps {
  children: React.ReactNode;
  name: string;
  size: string
}

export const Label = ({ children, name, size }: LabelProps) => {
  let labelSize = size === "base" ? 'text-base' : "text-lg"
  return (
    <label className={`leading-[25.2px] text-x font-medium ${labelSize}`} htmlFor={`${name}`}>
      {children}
    </label>
  );
};

// 로그인, 회원가입에서 라벨 사이즈=> base / 그 외 => lg 