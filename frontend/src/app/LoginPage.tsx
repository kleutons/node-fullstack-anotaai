import { useNavigate } from "react-router";
import ContactDev from "../components/ContactDev";
import ButtonPrimay from "../components/dashboard/ButtonPrimay";
import InputCheckbox from "../components/dashboard/InputCheckbox";
import InputText from "../components/dashboard/InputText";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "../components/dashboard/Spinner";

export default function LoginPage(){

    const { isAuthenticated, login, logout, isLoading } = useAuth();
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
    
        login({email, password});
    }

    if(isAuthenticated){
        window.dispatchEvent(new Event('localStorageUpdate'));
        navigate('/', {replace: true});
    }

    return(
    <>
        <div><Toaster /></div>
        <div className="flex flex-col md:grid md:grid-cols-2 h-screen justify-center items-center">
            <div className="w-full min-h-[390px] pt-6 md:pt-0 flex items-center justify-center md:justify-end px-4 md:pr-20 md:pl-8">
                

                <form className="flex flex-col gap-2 md:gap-3 w-full md:max-w-[500px]" onSubmit={handleSubmit}>

                    <h1 className=" text-3xl md:text-4xl font-bold">Login Anota AI</h1>
                    <hr className="mb-5" />

                    <InputText label="Email" name="email" required />
                    <InputText type={showPass ? 'text' : 'password'} label="Senha" name="password" required />
                    <InputCheckbox id='showPass' label="Mostrar Senha" checked={showPass} onChange={() => setShowPass(!showPass)}  />
                    
                    <ButtonPrimay type='submit'disabled={isLoading} >
                        {isLoading && <Spinner />}
                        ENTRAR
                    </ButtonPrimay>
                </form>
            
            </div>
            <div className="bg-[#012751] bg-gradient-to-br from-blue-800 to-[#012751] h-full text-white flex px-4 pt-8 md:pl-20 justify-center md:justify-start items-center w-full">
                <div className="flex flex-col gap-2 items-center md:items-start md:gap-4">
                    <div className="flex gap-6 mb-5 justify-center md:justify-start items-center">
                        <img src="./logo_anotaai_white.png" className="max-h-16" />
                        <img src="./logo_ifood_white.png" className="max-h-8" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold">
                        Projeto FullStack
                    </h3>
                    <p className="text-sm md:text-base">🚀 Bem-vindo à nossa aplicação!</p>
                    <p className="text-sm md:text-base text-center md:text-left max-w-96 ">Para acessar, entre em contato com o desenvolvedor: @Kleuton e solicite seus dados de login.</p>
                    <ContactDev />
                </div>
            </div>
        </div>
    </>
    );
}