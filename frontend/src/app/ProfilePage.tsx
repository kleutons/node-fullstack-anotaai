import { KeyRound, LogOut, Store, User } from "lucide-react";
import TitlePage from "../components/dashboard/TitlePage";
import CardSection from "../components/dashboard/CardSection";
import ButtonSecondary from "../components/dashboard/ButtonSecondary";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";


export default function ProfilePage() {

    const { user, getLoginDuration } = useAuth();

    return (
        <>
            <TitlePage text="Usuário" />
            
            <CardSection title="Detalhes da Conta">
                {!user ? (
                    <>
                        <div>Faça o login primeiro </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-6 p-0 sm:p-4">

                        <div className="flex items-center gap-2 ">
                            {user.status ? (
                                <>
                                    <span className="bg-sky-400 h-4 w-4 inline-block rounded-full"></span> Ativo
                                    <span className="text-sky-600">Último acesso {getLoginDuration()}</span>
                                </>
                            ) : (
                                <>
                                    <span className="bg-red-400 h-4 w-4 inline-block rounded-full"></span> Inativo
                                    <span className="text-sky-600">Último acesso {getLoginDuration()}</span>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 items-center mb-10">
                        
                            <div className="w-[144px] h-[144px] flex items-center justify-center">
                                {user?.imgUrl ? (
                                    <img src={user.imgUrl}  className="w-full h-full rounded-full object-cover object-cente"/>
                                
                                ) : (
                                    <div className="bg-slate-200 rounded-full p-8 text-sky-900">
                                        <User size={80} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="mb-5">
                                    <h3 className="text-3xl text-black">{user.name}</h3>
                                    <p className="text-lg text-sky-600">{user.email}</p>
                                    <p>+55 (41) 9 9944-7948</p>
                                </div>

                                <Link to={'/login'} className="w-full" >
                                    <ButtonSecondary>
                                        <div className="flex gap-3 text-sm items-center justify-center ">
                                            <LogOut size={20} />
                                            Sair
                                        </div>
                                    </ButtonSecondary>
                                </Link>
                            </div>
                        </div>
                            <hr />
                        <div className="flex flex-col gap-4 text-sky-900">
                            <div className="flex gap-4 items-center">
                                <Store size={30} className="text-slate-400" />
                                <p className="text-lg">Loja: <span className="font-bold">/{user.storeId}</span></p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <KeyRound size={30} className="text-slate-400" />
                                <div className="bg-sky-100 p-1 px-4 rounded-lg">{user.role}</div>
                            </div>
                        </div>
                    </div>
                )}
            </CardSection>
        </>
    );
}
