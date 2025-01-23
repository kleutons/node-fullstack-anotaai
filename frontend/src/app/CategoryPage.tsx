import React, { useEffect, useState } from "react";
import TitlePage from "../components/dashboard/TitlePage";
import HeaderList from "../components/dashboard/HeaderList";
import FilterSearch from "../components/dashboard/FilterSearch";
import ButtonAddListItem from "../components/dashboard/ButtonAddListItem";
import Modal from "../components/Modal";
import InputText from "../components/dashboard/InputText";
import InputTextArea from "../components/dashboard/InputTextArea";
import CategoryList from "../components/CategoryList";
import { CategoryDataInput, CategoryType } from "../types/CategoryType";
import useAxios, { useAxiosProps } from "../hooks/useAxios";
import axiosInstance from "../utils/AxiosInstance";
import { Toaster } from "react-hot-toast";

const axiosListCategory:useAxiosProps = {
    axiosInstance,
    method: "get",
    url: "/category",
    }; 

export default function CategoryPage() {
    const emptyData:CategoryDataInput = {title: '', description: ''};
    const [dataInput, setDataInput] = useState<CategoryDataInput>(emptyData);

    const titleModal = !dataInput.id  ? "Cadastrar Categoria" : "Editar Categoria";
    const [showModal, setShowModal] = useState(false);
    function toggleShowModal(){
       setShowModal(!showModal);
       if(showModal == false)
        setDataInput(emptyData);
    }

    const handleEditAction = (item: CategoryType) => {
        setDataInput(item);
        setShowModal(true);
    };

    const listCategory = useAxios<CategoryType[]>(axiosListCategory);


    const axiosSendCategory:useAxiosProps = {
        axiosInstance,
        method: !dataInput.id ? "post" : "put",
        url: !dataInput.id ? '/category' : `/category/${dataInput.id}`,        
        formData: {
            title: dataInput.title,
            description: dataInput.description
        }
    };

    const sendCategory = useAxios<CategoryType[]>(axiosSendCategory);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDataInput(prevData => ({
            ...prevData,
                [name]:value
        }));
    };
    
    const handleSendData = () =>{
        sendCategory.sendRequest();
        if(sendCategory.response.data)
            console.log(sendCategory.response.data);
    }

    useEffect(() =>{
        listCategory.sendRequest();
    }, [])

    
    return (
        <>  
            <div><Toaster/></div>

            <TitlePage text="Categorias" />
            
            <HeaderList>
                <FilterSearch />
                <ButtonAddListItem 
                    text="Nova Categoria" 
                    actionBtn={toggleShowModal} />
            </HeaderList>
            
            <Modal 
                title={titleModal}
                isShow={showModal} 
                toggleModal={toggleShowModal}
                submitAction={handleSendData}
             >
               <InputText       label="Título da Categoria" name='title' value={dataInput?.title || ''} onChange={handleInputChange  } />
               <InputTextArea   label="Descrição" name='description' value={dataInput?.description || ''}  onChange={handleInputChange  }/>
            </Modal>
        
            <section className="mt-6 gap-4 flex flex-col">
                <CategoryList data={listCategory.response.data} editAction={handleEditAction}  />
            </section>
        </>
    );
}