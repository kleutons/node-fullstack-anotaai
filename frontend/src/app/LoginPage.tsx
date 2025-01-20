import ContactDev from "../components/ContactDev";
import ButtonPrimay from "../components/dashboard/ButtonPrimay";
import InputText from "../components/dashboard/InputText";

export default function LoginPage(){
    return <div className="flex flex-col md:grid md:grid-cols-2 h-screen justify-center items-center">
        <div className="w-full min-h-[390px] pt-6 md:pt-0 flex items-center justify-center md:justify-end px-4 md:pr-20 md:pl-8">
            <div className="flex flex-col gap-2 md:gap-3 w-full md:max-w-[500px]">
                <h1 className=" text-3xl md:text-4xl font-bold">Login</h1>
                <hr className="mb-5" />

                <InputText label="Email" />
                <InputText label="Senha" />
                
                <ButtonPrimay text="ENTRAR" />
            </div>
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