import React, { ForwardedRef } from 'react';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputCheckbox = React.forwardRef<HTMLInputElement, InputTextProps>(({ label, ...props }, ref: ForwardedRef<HTMLInputElement>) => {

  return (
    <div className="mb-4 flex gap-2 ">
      <input 
        ref={ref}
        type='checkbox'
        {...props}
      />
      <label className="block text-sm font-medium text-slate-700">{label}</label>
    </div>
  );
});

export default InputCheckbox;
