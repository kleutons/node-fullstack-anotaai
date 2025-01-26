import { User } from "lucide-react";
import { useRef, useState } from "react";

import TitlePage from "../components/dashboard/TitlePage";
import CardSection from "../components/dashboard/CardSection";
import InputText from "../components/dashboard/InputText";
import ButtonPrimay from "../components/dashboard/ButtonPrimay";
import UserType from "../types/UserType";
import ButtonSecondary from "../components/dashboard/ButtonSecondary";
import { Link } from "react-router";


export default function UserPage() {

    const formUser = useRef<HTMLFormElement>(null);
    const [user, setUser] = useState<Partial<UserType>>({});

    const handleInputChage = (key: keyof UserType) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [key]: event.target.value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log(user);
    }

    return (
        <>
            <TitlePage text="Usuário" />
            
            <CardSection title="Detalhes da Conta">
                <form ref={formUser} onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-8 w-full mb-6">
                        <div className="flex-1">
                            <InputText label="Nome:" onChange={handleInputChage('name')}  />
                            <InputText label="Nome da Loja:" name="store" onChange={handleInputChage('storeId')}  />
                            <InputText label="Email:" name="email"  onChange={handleInputChage('email')} />
                        </div>
                        <div className="w-full md:w-2/5 flex flex-col justify-center items-center gap-6">

                            {user?.imgUrl ? (
                                <img src={user.imgUrl}  className="w-[144px] h-[144px] rounded-full object-cover object-cente"/>
                            
                            ) : (
                                <div className="bg-slate-200 rounded-full p-8 text-sky-900">
                                    <User size={80} />
                                </div>
                            )}
                            <div className="w-full">
                                <InputText name="urlImg" label="URL da Imagem:" onChange={handleInputChage('imgUrl')}  />
                            </div>
                        </div>
                    </div>

                    <div className=" w-full md:w-3/5 flex flex-col md:flex-row justify-between gap-4">
                        <Link to={'/login'} className="w-full" >
                            <ButtonSecondary text="Sair" />
                        </Link>
                        <ButtonPrimay type="submit">Salvar</ButtonPrimay>
                    </div>
                </form>
            </CardSection>
        </>
    );
}
