import { useState } from 'react';

// interface useInputType {
//   value: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   onSet: (val: any) => void;
// }

export const useInput = (
  init = ''
): [string, (event: React.ChangeEvent<HTMLInputElement>) => void, (val: any) => void] => {
  const [value, setValue] = useState(init);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onSet = (val: any) => {
    setValue(val);
  };

  return [value, onChange, onSet];
};

// const useState = <T>(initialValue: T): [T, (newValue: T) => void] => {
//   let value = initialValue;

//   const setValue = (newValue: T) => {
//     value = newValue;
//   };

//   return [value, setValue];
// };
