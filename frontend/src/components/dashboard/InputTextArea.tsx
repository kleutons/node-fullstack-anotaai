import React from 'react';

interface InputTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function InputTextArea({ label, rows = 3, cols = 50, ...rest }: InputTextAreaProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        rows={rows}
        cols={cols}
        className="mt-1 p-2 border border-slate-300 rounded-md w-full"
        {...rest}
      />
    </div>
  );
}
