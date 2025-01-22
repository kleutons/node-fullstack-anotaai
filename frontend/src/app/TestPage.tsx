import ButtonPrimay from "../components/dashboard/ButtonPrimay";
import TitlePage from "../components/dashboard/TitlePage";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../utils/AxiosInstance";



interface PokemonType{
    name: string,
    url: string
}


interface ApiResponse {
    results: PokemonType[]
}

export default function TestPage() {

    const { data, loading, error } = useAxios<ApiResponse>({
        axiosInstance,
        method: "get",
        url: "/"
    })


    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>;

    return(
        <>
            <TitlePage text="Test Page" />
            
            <div>
                {data?.results?.map((pokemon, index) =>(
                    <div key={`Pok-${index}`} className="mb-3 p-2 border-b border-gray-300">
                        <h3 className="text-lg font-semibold">{pokemon.name}</h3>
                        <p>{pokemon.url}</p>
                    </div>
                ))}
            </div>

            <br />

            <ButtonPrimay text="Execultar GET" /> 
        </>
    )
}