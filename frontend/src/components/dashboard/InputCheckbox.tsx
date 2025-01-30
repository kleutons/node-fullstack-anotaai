import React from 'react';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export default function InputCheckbox({ id, label, ...props }: InputTextProps) {
  return (
    <div className="flex items-center mb-4">
      <input 
        id={id} 
        type="checkbox" 
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 cursor-pointer"
        {...props} 
      />
      <label 
        htmlFor={id} 
        className="ms-2 text-sm font-medium cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  );
}
