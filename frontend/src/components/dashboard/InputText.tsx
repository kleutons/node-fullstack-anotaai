import React, { ForwardedRef } from 'react';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(({ label, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
  if (!props.type)
    props.type = 'text';

  const inputPattern = props.type === 'number' ? '^\\d+(\\.\\d{1,2})?$' : undefined;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input 
        ref={ref}
        type={props.type}
        name="nome"
        className="mt-1 p-2 border border-slate-300 rounded-md w-full"
        step="0.01"
        pattern={inputPattern}
        placeholder={inputPattern ? '0.00' : ''}
        {...props}
      />
    </div>
  );
});

export default InputText;
