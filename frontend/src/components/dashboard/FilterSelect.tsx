import SelectData from "../../types/SelectData";

interface FilterSelectProps {
    label: string;
    options: SelectData[];
    onFilter?: (value: string) => void;
}

export default function FilterSelect({ label, options, onFilter }: FilterSelectProps) {
    return (
        <div className="flex w-full md:w-auto items-center border bg-white">
            <select className="p-3 w-full"  onChange={(e) => onFilter && onFilter(e.target.value)}>
                <option value="">Filtrar por {label}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    );
}
