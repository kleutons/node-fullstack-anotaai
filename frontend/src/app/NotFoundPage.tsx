import { NavLink } from "react-router";
import TitlePage from "../components/dashboard/TitlePage";
import ButtonPrimay from "../components/dashboard/ButtonPrimay";


export default function NotFoundPage(){
    return (
        <div className="w-full h-svh flex flex-col gap-4 justify-center items-center ">
            <div className="max-w-2xl flex flex-col gap-4 justify-center text-center">
                <p className="text-blue-500 text-5xl font-bold">404</p>
        
                <TitlePage text="Page not found!" />

                <p>Desculpe, não conseguimos encontrar a página que você está procurando.</p>

                
                <NavLink to="/">
                    <ButtonPrimay>Voltar para Página Inicial</ButtonPrimay>
                </NavLink>
            </div>
        </div>
    )
}