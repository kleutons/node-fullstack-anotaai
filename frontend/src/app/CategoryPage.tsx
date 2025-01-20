import { CirclePlus } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import TitlePage from "../components/dashboard/TitlePage";
import HeaderList from "../components/dashboard/HeaderList";
import FilterSearch from "../components/dashboard/FilterSearch";
import ButtonAddListItem from "../components/dashboard/ButtonAddListItem";
import Modal from "../components/Modal";
import InputText from "../components/dashboard/InputText";
import InputTextArea from "../components/dashboard/InputTextArea";
import ButtonsActionForList from "../components/dashboard/ButtonsActionForList";




const categoryItems = [
    {   
        id: '01', name: "Bebidas"
    },
    {
        id: '02', name: "Lanches"
    }
]

export default function CategoryPage() {
   
    const [showModal, setShowModal] = useState(false);

    function toggleShowModal(){
        setShowModal(!showModal);
    }

    return (
        <>
            <TitlePage text="Categorias" />
            
            <HeaderList>
                
                <FilterSearch />
                <ButtonAddListItem 
                    text="Nova Categoria" 
                    actionBtn={toggleShowModal} />

            </HeaderList>
            
            <Modal isShow={showModal} toggleModal={toggleShowModal} >
               <InputText       label="Título da Categoria" />
               <InputTextArea   label="Descrição" />
            </Modal>

            <section className="mt-6 gap-4 flex flex-col">
                {
                    categoryItems.map((item)=>(
                        <div key={item.id} className="bg-white p-2 rounded-md flex justify-between items-center">
                            <div className="flex-1 pt-4 pl-4 flex flex-col gap-2">

                                <h3 className="text-2xl">{item.name}</h3>

                                <Link to={'/product'} className="flex items-center justify-center gap-1" >
                                    <CirclePlus size={18} />  
                                    <span>Adicionar Produto</span>
                                </Link>

                            </div>
                            <div className="flex p-2 flex-col gap-2">
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
                
            </section>
        </>
    );
}
