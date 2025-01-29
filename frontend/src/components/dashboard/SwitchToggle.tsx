interface SwitchToggleProps {
    label: string;
    isChecked?: boolean;
    onToggle: () => void;
}

export default function SwitchToggle({ label, isChecked, onToggle }: SwitchToggleProps) {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isChecked} 
                onChange={onToggle} 
            />
            <span className="me-3 text-sm">{label}</span>
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        </label>
    );
}