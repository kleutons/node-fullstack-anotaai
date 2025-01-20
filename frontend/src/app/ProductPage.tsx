
import { useState } from "react";

import TitlePage from "../components/dashboard/TitlePage";
import HeaderList from "../components/dashboard/HeaderList";
import FilterSearch from "../components/dashboard/FilterSearch";
import FilterSelect from "../components/dashboard/FilterSelect";
import ButtonAddListItem from "../components/dashboard/ButtonAddListItem";
import Modal from "../components/Modal";
import InputText from "../components/dashboard/InputText";
import Select from "../components/dashboard/Select";
import InputTextArea from "../components/dashboard/InputTextArea";
import CardSection from "../components/dashboard/CardSection";
import ButtonsActionForList from "../components/dashboard/ButtonsActionForList";


const produtostems = [
    { id: '01', name: "CocaCola", category: "Bebida" },
    { id: '02', name: "Sprite", category: "Bebida" },
    { id: '03', name: "Suco de Uva", category: "Bebida" },
    { id: '04', name: "Hamburguer", category: "Lanche" },
    { id: '05', name: "Pizza", category: "Lanche" }
];

export default function ProductPage() {
    const [showModal, setShowModal] = useState(false);
    
    function toggleShowModal(){
        setShowModal(!showModal);
    }
    
    return (
        <>
            <TitlePage text="Produtos" />

            <HeaderList>

                <FilterSearch />
                <FilterSelect /> 
                <ButtonAddListItem 
                    text="Novo Produto" 
                    actionBtn={toggleShowModal} />

            </HeaderList>

            <Modal isShow={showModal} toggleModal={toggleShowModal} >
                <InputText       label="Nome do Produto" />
                <Select label="Categoria" options={['Bebidas', 'Lanches']}/>
                <InputText       label="(R$) Preço" type={'number'} />
                <InputTextArea   label="Descrição" />
            </Modal>
            
            <CardSection title="Lista de Produtos">
                <div className="grid grid-cols-4 py-3 px-2 border-b font-semibold uppercase text-sm">
                    <div className="col-span-3 grid grid-cols-2">
                        <div>Produtos</div>
                        <div className="hidden md:block">Categoria</div>
                    </div>
                    <div className="text-center">Ações</div>
                </div>
                {
                    produtostems.map((item) => ( 
                        <div className="grid grid-cols-4 py-3 px-2 items-center border-b hover:bg-slate-100 hover:text-black ">
                            <div className="col-span-3 flex flex-col md:grid md:grid-cols-2">
                                <div>{item.name}</div>
                                <div>{item.category}</div>
                            </div>
                            <div className="flex flex-col justify-center items-center md:flex-row gap-2">
                                {
                                    <ButtonsActionForList
                                        trashAction={()=>console.log('delete')}
                                        editAction={()=>console.log('editar')}
                                    />
                                }
                            </div>
                        </div>
                    ))
                }
            </CardSection>

        </>
    );
}
