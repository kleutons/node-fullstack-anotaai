import { useMemo, useState } from "react";
import TitlePage from "../components/dashboard/TitlePage";
import HeaderList from "../components/dashboard/HeaderList";
import FilterSearch from "../components/dashboard/FilterSearch";
import ButtonAddListItem from "../components/dashboard/ButtonAddListItem";
import Modal from "../components/Modal";
import InputText from "../components/dashboard/InputText";
import InputTextArea from "../components/dashboard/InputTextArea";
import useAuth from "../hooks/useAuth";
import CategoryList from "../components/CategoryList";
import { CategoryType } from "../types/CategoryType";
import useAxios, { useAxiosProps } from "../hooks/useAxios";
import axiosInstance from "../utils/AxiosInstance";

export default function CategoryPage() {
    const {token} = useAuth();
    const [dataEdit, setDataEdit] = useState<CategoryType>();

    const [showModal, setShowModal] = useState(false);
    function toggleShowModal(){
       setShowModal(!showModal);
       if(showModal == false)
        setDataEdit(undefined);
    }

    const titleModal = dataEdit ? "Editar Categoria" : "Cadastrar Categoria";

    const handleEditAction = (item: CategoryType) => {
        setDataEdit(item);
        setShowModal(true);
    };


    const axiosConfig:useAxiosProps = useMemo(() => ({
        axiosInstance,
        method: "get",
        url: "/category",
        token,
        othersConfigs: {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }), [token]); 

    const {data, error} = useAxios<CategoryType[]>(axiosConfig);
    
    return (
        <>
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
             >
               <InputText       label="Título da Categoria" value={dataEdit?.title || ''} />
               <InputTextArea   label="Descrição" value={dataEdit?.description || ''} />
            </Modal>
            {
                error && error !== "undefined" && (
                    <div className="text-red-400">
                        {error}
                    </div>
                )
            }
            <section className="mt-6 gap-4 flex flex-col">
                <CategoryList data={data} editAction={handleEditAction}  />
            </section>
        </>
    );
}