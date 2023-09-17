import type { InputHTMLAttributes } from 'react';
import React from 'react';

import type { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input, Label } from '.';

interface InputFormProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  rules: Pick<RegisterOptions<T>, 'maxLength' | 'minLength' | 'validate' | 'required' | 'pattern'>;
  _size: string;
}

export default function InputForm({ name, register, errors, rules, _size, type, ...props }: InputFormProps<FieldValues>) {
  const errorMessages = errors ? errors[name]?.message : '';
  const hasError = !!(errors && errorMessages);

  return (
    <div className="flex flex-col">
      <Input name={name} _size={_size} type={type} {...props} {...(register && register(name, rules))} />
      {hasError && (
        <Label name={name} size="base" type="error">
          {errorMessages + ''}
        </Label>
      )}
    </div>
  );
}
