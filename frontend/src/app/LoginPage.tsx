import { useNavigate } from "react-router";
import ContactDev from "../components/ContactDev";
import ButtonPrimay from "../components/dashboard/ButtonPrimay";
import InputCheckbox from "../components/dashboard/InputCheckbox";
import InputText from "../components/dashboard/InputText";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

export default function LoginPage(){

    const { isAuthenticated, login, logout, loading, error } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const [hasLoggedOut, setHasLoggedOut] = useState(false);

    useEffect(()=>{
        if(!hasLoggedOut){
            logout();
            setHasLoggedOut(true);
        }
    }, [logout, hasLoggedOut])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email     = formData.get("email") as string;
        const password  = formData.get("password") as string;
    
        login(email, password);
    }

    if(isAuthenticated){
        navigate('/', {replace: true});
    }

    return <div className="flex flex-col md:grid md:grid-cols-2 h-screen justify-center items-center">
        <div className="w-full min-h-[390px] pt-6 md:pt-0 flex items-center justify-center md:justify-end px-4 md:pr-20 md:pl-8">
            

            <form className="flex flex-col gap-2 md:gap-3 w-full md:max-w-[500px]" onSubmit={handleSubmit}>
                {loading && (
                    <div>Carregando...</div>
                )}
                <h1 className=" text-3xl md:text-4xl font-bold">Login Anota AI</h1>
                <hr className="mb-5" />

                <InputText label="Email" name="email" required />
                <InputText type={showPass ? 'text' : 'password'} label="Senha" name="password" required />
                <InputCheckbox label="Mostrar Senha" checked={showPass} onChange={() => setShowPass(!showPass)}  />
                
                <ButtonPrimay type="submit">ENTRAR</ButtonPrimay>
                {error && (
                    <div className="text-red-400">{error}</div>
                )}
            </form>
        
        </div>
        <div className="bg-[#012751] bg-gradient-to-br from-blue-800 to-[#012751] h-full text-white flex px-4 pt-8 md:pl-20 justify-center md:justify-start items-center w-full">
            <div className="flex flex-col gap-2 md:gap-4">
                <img src="./anotaiIfood.png" className="max-w-40 md:max-w-48 mb-5" />
                
                <h3 className="text-3xl md:text-4xl font-bold">
                    Projeto FullStack
                </h3>
                <p className="text-sm md:text-base">Desenvolvido por @Kleuton</p>
                <ContactDev />
            </div>
        </div>
    </div>
}