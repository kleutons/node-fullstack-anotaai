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
import { useProductList } from "../hooks/product/useProductList";
import { Toaster } from "react-hot-toast";
import ProductList from "../components/ProductList";
import { useProductForm } from "../hooks/product/useProductForm";
import isProductFullType from "../utils/isProductFullType";
import { useProductDelete } from "../hooks/product/useProductDelete";
import { useCategoryList } from "../hooks/category/useCategoryList";
import { ImagePlus } from "lucide-react";
import FilterSelectData from "../types/SelectData";


export default function ProductPage() {

    const { data:categoryData }     = useCategoryList();
    const { data, actionList }      = useProductList();
    const { modal, item, action }   = useProductForm(actionList.addOrUpdateItemList);
    const { actionDelete }          = useProductDelete(actionList.deleteIdList);
    
    const titleModal = !isProductFullType(item.dataForm)  ? "Cadastrar Produto" : "Editar Produto";
    
    const CategoryData:FilterSelectData[] = categoryData.categories.map((item) => ({id: item.id, text: item.title}));

    return (
        <>
            <div><Toaster/></div>
            <TitlePage text="Produtos" />

            <Modal 
                title={titleModal}
                isShow={modal.showModal} 
                isLoading={modal.isLoading}
                toggleModal={modal.toggleModal}
                submitAction={action.submitItem}
            >   
                <div className="flex flex-col md:flex-row gap-8 w-full mb-6">
                    <div className="flex-1">
                        <InputText       label="Nome do Produto" name='title' value={item.dataForm.title || ''} onChange={item.setInputValue} required  />
                        <Select 
                            label="Categoria" 
                            name='categoryId'
                            options={CategoryData}
                            value={item.dataForm.categoryId || ''} 
                            onChange={item.setInputValue}
                            required
                        />
                        <InputText       label="(R$) Preço" type={'number'} name='price' value={item.dataForm.price || ''} onChange={item.setInputValue} required />
                        <InputTextArea   label="Descrição" name='description' value={item.dataForm.description || ''}  onChange={item.setInputValue} required />
                    </div>
                    <div className="w-full md:w-2/5 flex flex-col justify-center items-center gap-6">
                        {item.dataForm?.imgUrl ? (
                            <img src={item.dataForm.imgUrl}  className="w-[200px] h-[200px] rounded-full object-cover object-cente"/>
                        
                        ) : (
                            <div className="bg-slate-200 rounded-full p-8 text-sky-900">
                                <ImagePlus size={80} />
                            </div>
                        )}
                        <div className="w-full">
                            <InputText label="URL da Imagem:" name="imgUrl" value={item.dataForm.imgUrl || ''} onChange={item.setInputValue}  />
                        </div>
                    </div>
                </div>
            </Modal>

            <HeaderList>
                <FilterSearch onSearch={data.searchProduct} />
                <FilterSelect label="Categoria" options={CategoryData} onFilter={data.filterByCategory}  /> 
                    <ButtonAddListItem 
                        text="Novo Produto" 
                        actionBtn={modal.toggleModal} />
            </HeaderList>

            <CardSection title="Lista de Produtos">
                <ProductList 
                    data={data.products} 
                    dataCategory={categoryData.categories} 
                    isLoading={actionList.isLoading} 
                    editAction={action.editItem} 
                    deleteAction={actionDelete} />
            </CardSection>

        </>
    );
}
