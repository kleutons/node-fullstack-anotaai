import TitlePage from "../components/dashboard/TitlePage";
import CardSection from "../components/dashboard/CardSection";
import UserList from "../components/UserList";
import { useUserList } from "../hooks/user/useUserList";
import { useUserForm } from "../hooks/user/useUserForm";
import { useUserDelete } from "../hooks/user/useUserDelete";
import Modal from "../components/Modal";
import isUserFullType from "../utils/isUserFullType";
import FilterSearch from "../components/dashboard/FilterSearch";
import FilterSelect from "../components/dashboard/FilterSelect";
import ButtonAddListItem from "../components/dashboard/ButtonAddListItem";
import HeaderList from "../components/dashboard/HeaderList";
import InputText from "../components/dashboard/InputText";
import Select from "../components/dashboard/Select";
import { UserRound } from "lucide-react";
import SwitchToggle from "../components/dashboard/SwitchToggle";
import { useState } from "react";
import { Toaster } from "react-hot-toast";


export default function UserListPage() {

    const { data, actionList }      = useUserList();
    const { modal, item, action }   = useUserForm(actionList.addOrUpdateItemList);
    const { actionDelete }          = useUserDelete(actionList.deleteIdList);
    const titleModal = !isUserFullType(item.dataForm)  ? "Cadastrar Usuário" : "Editar Usuário";
    const RoleData = [
        {id: 'ADMIN', text: 'ADMIN'},
        {id: 'STORE', text: 'STORE'}  
    ];

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        //Limpar Password
        item.clearPassword();
        setShowPassword(!showPassword);
    };
    
    return (
        <>  
            <div><Toaster /></div>
            <TitlePage text="Usuário" />
            
            <HeaderList>
                <FilterSearch onSearch={data.searchUsers} />
                <FilterSelect label="Função" options={RoleData} />
                <ButtonAddListItem
                    text="Novo Usuário" 
                    actionBtn={modal.toggleModal} />
            </HeaderList>

            <Modal
                title={titleModal}
                isShow={modal.showModal} 
                isLoading={modal.isLoading}
                toggleModal={modal.toggleModal}
                submitAction={action.submitItem}
            >
                <div className="flex flex-col md:flex-row gap-8 w-full mb-6">
                    <div className="flex-1">
                        <InputText       label="Nome do Usuário" name='name'   value={item.dataForm.name || ''}        onChange={item.setInputValue} required  />
                        <InputText       label="Nome da Loja"    name='storeId' value={item.dataForm.storeId || ''}     onChange={item.setInputValue} required  />
                        {isUserFullType(item.dataForm) && (
                            <Select 
                                label="Função" 
                                name='categoryId'
                                options={RoleData}
                                value={item.dataForm.role || ''} 
                                onChange={item.setInputValue}
                                required
                            />
                        )}
                        <InputText       label="Email"           name='email'   value={item.dataForm.email || ''}       onChange={item.setInputValue} required  />
                        <SwitchToggle    label="Alterar Senha?" onToggle={handleTogglePassword} />
                        {showPassword && (
                            <InputText       label="Senha"           name='password' value={item.dataForm.password || ''}   onChange={item.setInputValue}   />
                        )}
                    </div>
                    <div className="w-full md:w-2/5 flex flex-col justify-center items-center gap-6">
                        {item.dataForm?.imgUrl ? (
                            <img src={item.dataForm.imgUrl}  className="w-[200px] h-[200px] rounded-full object-cover object-cente"/>
                        
                        ) : (
                            <div className="bg-slate-200 rounded-full p-8 text-sky-900">
                                <UserRound size={80} />
                            </div>
                        )}
                        <div className="w-full">
                            <InputText label="URL da Imagem:" name="imgUrl" value={item.dataForm.imgUrl || ''} onChange={item.setInputValue}  />
                        </div>
                    </div>  
                </div>
            </Modal>

            <CardSection title="Detalhes da Conta">
                <UserList 
                    data={data.users}
                    isLoading={actionList.isLoading} 
                    editAction={action.editItem} 
                    deleteAction={actionDelete}
                />
            </CardSection>
        </>
    );
}
