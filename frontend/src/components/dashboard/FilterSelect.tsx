import { CategoryFullType } from "../../types/CategoryType";

interface FilterSelectProps {
    categories: CategoryFullType[];
    onFilter?: (category: string) => void;
}

export default function FilterSelect({ categories, onFilter }: FilterSelectProps) {
    return (
        <div className="flex w-full md:w-auto items-center border bg-white">
            <select className="p-3 w-full"  onChange={(e) => onFilter && onFilter(e.target.value)}>
                <option value="">Filtrar por Categoria</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
