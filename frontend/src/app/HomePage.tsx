import { useState, useEffect } from 'react';
import { User, Calendar, Tag, Package, Archive } from 'lucide-react';
import { Link } from 'react-router';
import TitlePage from '../components/dashboard/TitlePage';
import ButtonPrimay from '../components/dashboard/ButtonPrimay';
import CardHome from '../components/dashboard/CardHome';
import useAuth from '../hooks/useAuth';
import useTotal from '../hooks/useTotal';

export default function HomePage() {

    const {user} = useAuth();
    const total = useTotal();


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
                <div className="flex flex-col md:flex-row gap-4 max-w-full lg:max-w-[80%]">
                    
                    <CardHome>
                        <div>
                            <p className="text-lg font-medium">Bem Vindo:</p>
                            <h3 className="text-2xl text-slate-800 font-semibold">{user?.name}</h3>
                        </div>
                        <User className="text-sky-600 " size={40} />
                    </CardHome>
                    

                    <CardHome>
                        <div className="flex gap-2">
                            <span className="text-6xl gap-1 font-bold">{currentDate.day}</span>
                            <p className="flex flex-col">
                                <span className="text-3xl font-bold">{currentDate.month}</span>
                                <span>{currentDate.year}</span>
                            </p>
                        </div>
                        <Calendar className="text-sky-600 " size={40} />
                    </CardHome>
                  
                </div>

                <div className="flex flex-col md:flex-row gap-4 max-w-full lg:max-w-[80%] ">
                    
                    <CardHome type='secondary'>
                        <h3 className="text-6xl font-bold">{total.categories}</h3>
                        <div className="w-full flex flex-col items-end">
                            <Tag className="text-sky-600 " size={40} />
                            <h4 className="font-medium text-lg">Categorias</h4>
                            <p className='text-xs'>Cadastradas</p>
                        </div>
                    </CardHome>
                    
                    <CardHome type='secondary'>
                        <h3 className="text-6xl font-bold">{total.products}</h3>
                        <div className="flex flex-col items-end">
                            <Package className="text-sky-600 " size={40} />
                            <h4 className="font-medium text-lg">Produtos</h4>
                            <p className='text-xs'>Cadastrados</p>
                        </div>
                    </CardHome>
                   
                </div>
                <Link to={"/catalog"} className='transition-transform transform hover:scale-105'>
                    <CardHome type='primary'>
                        <div className='flex-1'>
                            <span>Acessar:</span>
                            <h3 className="text-4xl font-bold">Catálogo Online</h3>
                        </div>
                        <div className="flex flex-col items-end">
                            <Archive className="text-blue-100 " size={40} />
                        </div>
                    </CardHome>
                </Link>


                <div className="flex flex-col md:flex-row gap-4 max-w-full lg:max-w-[50%] ">
                    <ButtonPrimay text='Adicionar Categoria' link='/category' />
                    <ButtonPrimay text='Adicionar Produto' link='/product' />
                </div>
            </section>
        </>
    );
}
