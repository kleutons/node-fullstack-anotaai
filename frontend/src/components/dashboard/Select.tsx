import SelectData from "../../types/SelectData";

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectData[];
}

export default function Select({ label, options, ...props }: SelectProps) {
  return (
      <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700">{label}</label>
          <select 
            className="mt-1 p-2 border border-slate-300 rounded-md w-full"
            {...props}
          >
              <option value="">Selecione {label}</option>
              {options.map((option) => (
                  <option key={option.id} value={option.id}>
                      {option.text}
                  </option>
              ))}
          </select>
      </div>
  );
}
