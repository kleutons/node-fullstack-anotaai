import React, { ForwardedRef } from 'react';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(({ label, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
  if (!props.type)
    props.type = 'text';

  const inputPattern = props.type === 'number' ? '^\\d+(\\.\\d{1,2})?$' : undefined;

  // Função para formatar o valor ao desfocar o campo de entrada
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (props.type === 'number') {
      e.target.value = parseFloat(value).toFixed(2);
    }
    if (props.onBlur) { 
      props.onBlur(e);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input 
        ref={ref}
        type={props.type}
        className="mt-1 p-2 border border-slate-300 rounded-md w-full"
        step="0.01"
        pattern={inputPattern}
        placeholder={inputPattern ? '0.00' : ''}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
});

export default InputText;
