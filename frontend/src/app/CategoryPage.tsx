
import CategoryList from "../components/CategoryList";
import TitlePage from "../components/dashboard/TitlePage";
import { Toaster } from "react-hot-toast";
import { useCategoryList } from "../hooks/category/useCategoryList";
import { useCategoryForm } from "../hooks/category/useCategoryForm";
import { useCategoryDelete } from "../hooks/category/useCategoryDelete";
import HeaderList from "../components/dashboard/HeaderList";
import FilterSearch from "../components/dashboard/FilterSearch";
import ButtonAddListItem from "../components/dashboard/ButtonAddListItem";
import Modal from "../components/Modal";
import InputText from "../components/dashboard/InputText";
import InputTextArea from "../components/dashboard/InputTextArea";
import isCategoryFullType from "../utils/isCategoryFullType";
import ModalConfirm from "../components/ModalConfirm";

export default function CategoryPage(){
  
  const { data, actionList } = useCategoryList();
  const { modal, item, action } = useCategoryForm(actionList.addOrUpdateItemList);
  const { modalDelete, actionDelete } = useCategoryDelete(actionList.deleteIdList);
  
  const titleModal = !isCategoryFullType(item.dataForm)  ? "Cadastrar Categoria" : "Editar Categoria";

  return (
    <>
      <div><Toaster/></div>
      
      <Modal 
          title={titleModal}
          isShow={modal.showModal} 
          isLoading={modal.isLoading}
          toggleModal={modal.toggleModal}
          submitAction={action.submitItem}
        >
          <InputText       label="Título da Categoria" name='title' value={item.dataForm.title || ''} onChange={item.setInputValue} required />
          <InputTextArea   label="Descrição" name='description' value={item.dataForm.description || ''}  onChange={item.setInputValue} required/>
      </Modal>

      <ModalConfirm
        isShow={modalDelete.showModal}
        isLoading={modalDelete.isLoading}
        toggleModal={modalDelete.toggleModal}
        submitAction={actionDelete.deleteItem}
       />

      <TitlePage text="Categorias" />
          
      <HeaderList>
          <FilterSearch onSearch={data.searchCategory} />
          
            <ButtonAddListItem 
                text="Nova Categoria" 
                actionBtn={modal.toggleModal} />
     
      </HeaderList>
      
      <section className="mt-6 gap-4 flex flex-col">
          <CategoryList  data={data.categories} isLoading={actionList.isLoading} editAction={action.editItem} deleteAction={actionDelete.openConfirm}  />
      </section>
</>
  )
}