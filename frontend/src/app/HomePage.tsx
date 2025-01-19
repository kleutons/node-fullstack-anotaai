import { useState, useEffect } from 'react';
import { User, Calendar, Tag, Package, Archive } from 'lucide-react';
import { Link } from 'react-router';
import TitlePage from '../components/dashboard/TitlePage';
import ButtonPrimay from '../components/dashboard/ButtonPrimay';

export default function HomePage() {
    const [currentDate, setCurrentDate] = useState({
        day: '',
        month: '',
        year: ''
    });

    useEffect(() => {
        const date = new Date();
        setCurrentDate({
            day: date.getDate().toString().padStart(2, '0'),
            month: (date.getMonth() + 1).toString().padStart(2, '0'), // January is 0!
            year: date.getFullYear().toString()
        });
    }, []);

    return (
        <>
            <TitlePage text="Página Inicial" />

            <section className="flex flex-col gap-8 py-10 w-full text-slate-600">
                <div className="flex flex-col md:flex-row gap-4 max-w-full lg:max-w-[80%] ">
                    <div className="p-4 flex-1 rounded-md bg-white shadow-md transition-transform transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-medium">Bem Vindo:</p>
                                <h3 className="text-2xl text-slate-800 font-semibold">Usuário</h3>
                            </div>
                            <User className="text-sky-600 " size={40} />
                        </div>
                    </div>

                    <div className="p-4 flex-1 rounded-md bg-white shadow-md transition-transform transform">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <span className="text-6xl gap-1 font-bold">{currentDate.day}</span>
                                <p className="flex flex-col">
                                    <span className="text-3xl font-bold">{currentDate.month}</span>
                                    <span>{currentDate.year}</span>
                                </p>
                            </div>
                            <Calendar className="text-sky-600 " size={40} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 max-w-full lg:max-w-[80%] ">
                    <div className="p-4 flex-1 rounded-md bg-gradient-to-r from-blue-100/50 to-blue-100 shadow-md transition-transform transform">
                        <div className="flex items-center justify-between">
                            <h3 className="text-6xl font-bold">02</h3>
                            <div className="w-full flex flex-col items-end">
                                <Tag className="text-sky-600 " size={40} />
                                <h4 className="font-medium text-lg">Categorias</h4>
                                <p className='text-xs'>Cadastradas</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 flex-1 flex rounded-md bg-gradient-to-r from-blue-100/50 to-blue-100 shadow-md transition-transform transform">
                        <div className="flex-1 flex items-center justify-between">
                            <h3 className="text-6xl font-bold">06</h3>
                            <div className="flex flex-col items-end">
                                <Package className="text-sky-600 " size={40} />
                                <h4 className="font-medium text-lg">Produtos</h4>
                                <p className='text-xs'>Cadastrados</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Link to={"/catalog"}>
                    <div className="flex flex-col md:flex-row gap-4 max-w-full lg:max-w-[80%] text-white ">
                        <div className="p-4 flex-1 flex rounded-md bg-gradient-to-r from-blue-600 to-blue-500 shadow-md transition-transform transform hover:scale-105">
                            <div className="flex-1 flex items-center justify-between">
                                <div className='flex-1'>
                                    <span>Acessar:</span>
                                    <h3 className="text-4xl font-bold">Catálogo Online</h3>
                                </div>
                                <div className="flex flex-col items-end">
                                    <Archive className="text-blue-100 " size={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="flex flex-col md:flex-row gap-4 max-w-full lg:max-w-[50%] ">
                    <ButtonPrimay text='Adicionar Categoria' link='/category' />
                    <ButtonPrimay text='Adicionar Produto' link='/product' />
                </div>
            </section>
        </>
    );
}
