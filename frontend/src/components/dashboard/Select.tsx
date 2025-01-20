interface SelectProps {
    label: string;
    options: string[];
  }
  
  export default function Select({ label, options }: SelectProps) {
    return (
      <>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700">{label}</label>
          <select className="mt-1 p-2 border border-slate-300 rounded-md w-full">
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
  