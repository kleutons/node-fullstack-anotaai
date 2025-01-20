export default function FilterSelect(){
    return (
        <div className="flex w-full md:w-auto items-center border bg-white">
            <select className="p-3 w-full">
                <option value="">Filtrar por Categoria</option>
                <option value="categoria1">Categoria 1</option>
                <option value="categoria2">Categoria 2</option>
                <option value="categoria3">Categoria 3</option>
            </select>
        </div>
    )
}