
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
import ButtonPrimay from "../components/dashboard/ButtonPrimay";
import { DatabaseBackup } from "lucide-react";


export default function CategoryPage(){
  
  const { data, actionList } = useCategoryList();
  const { modal, item, action } = useCategoryForm(actionList.addOrUpdateItemList);
  const { actionDelete } = useCategoryDelete(actionList.deleteIdList);
  
  const titleModal = !isCategoryFullType(item.dataForm)  ? "Cadastrar Categoria" : "Editar Categoria";

  return (
    <>
      <TitlePage text="Categorias" />
      
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
          
      <HeaderList>
          <FilterSearch onSearch={data.searchCategory} />
          <div className="flex gap-2 items-center">
            <ButtonAddListItem 
                text="Nova Categoria" 
                actionBtn={modal.toggleModal} />
            <div>
              <ButtonPrimay 
                onClick={actionList.updateCache}
                disabled={actionList.isLoadingCache}>
                <DatabaseBackup />
              </ButtonPrimay>
            </div>
          </div>
      </HeaderList>
      
      <section className="mt-6 gap-4 flex flex-col">
          <CategoryList  data={data.categories} isLoading={actionList.isLoading} editAction={action.editItem} deleteAction={actionDelete}  />
      </section>
</>
  )
}