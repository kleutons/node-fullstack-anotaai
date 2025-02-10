import { Search, ShoppingCart} from "lucide-react";
import { useEffect, useState } from "react";
import SidebarCart from "../../components/catalog/SidebarCart";
import CartItemList from "../../components/catalog/CartItemList";
import SidebarCartFooter from "../../components/catalog/SidebarCartFooter";
import ContentLayout from "../../components/catalog/ContentLayout";
import HeaderOwner from "../../components/catalog/HeaderOwner";
import HeaderMenu from "../../components/catalog/HeaderMenu";
import { HeaderCatalog } from "../../components/catalog/HeaderCatalog";
import FooterCatalog from "../../components/catalog/FooterCatalog";
import CatalogProductList from "../../components/catalog/CatalogProductList";
import { useParams } from "react-router";
import { useCatalogList } from "../../hooks/catalog/useCatalogList";
import { Toaster } from "react-hot-toast";
import NotFoundPage from ".././NotFoundPage";
import Spinner from "../../components/dashboard/Spinner";
import useCart from "../../hooks/useCart";
import Footer from "../../components/dashboard/Footer";


export default function CatalogPage(){

    const { ownerIdOrStoreId } = useParams();
    const { data, actionList } = useCatalogList();
    const { dataCart, actionCart } = useCart();
    const [ sidebarOpen, setSidebarOpen ] = useState(false);
    
    const toggleSidebar = () => { setSidebarOpen(!sidebarOpen)};


    useEffect(()=>{
        if(ownerIdOrStoreId){
            actionList.getCatalog(ownerIdOrStoreId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ownerIdOrStoreId]);

     if (actionList.isLoading) 
        return <div className="flex gap-2 justify-center items-center"> <Spinner theme="dark" /> Carregando...</div>;

    if(data.dataOwner === null)
        return (
        <>
            <Toaster />
            <NotFoundPage title="Catálogo Não Encontrado!" /> 
        </>
        )

    return(
        <>  
        <Toaster
        position="bottom-left"
        reverseOrder={false}
        />
        <SidebarCart title="Carrinho" sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} >
            {dataCart.cartItems.length <= 0 ? 
                (
                    <div className="flex-1 flex flex-col p-6 gap-3 justify-center items-center">
                    
                        <ShoppingCart size={33} />
                        <p><b>Seu carrinho está vazio!</b></p>
                        <p className="text-2xl">🍔🍕🍟 </p>
                        <p>Aproveite nossas deliciosas opções e faça seu pedido!</p>

                    </div>
                ):( 
                    <>
                        <CartItemList data={dataCart.cartItems} updateQuantity={actionCart.updateCartItemQty} />
                        <SidebarCartFooter subtotal={dataCart.subtotal} />
                    </>
                )
            }
        </SidebarCart>

            <div className="flex flex-col min-h-svh text-slate-500">
                
                <HeaderCatalog>
                    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10 justify-between items-center">
                        <HeaderOwner 
                            imgUrl={data.dataOwner.imgUrl}
                            name={data.dataOwner.name}
                            minPrice={15}
                        />
                        <div className="relative w-full md:flex-1">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <Search size={23} className="text-slate-400" />
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 shadow-md" placeholder="O que você deseja comer hoje?" onChange={(e) => actionList.searchProducts(e.target.value)} />
                        </div>

                        <button className="text-white hidden md:inline-block cursor-pointer relative" onClick={() => toggleSidebar()}>
                            {dataCart.cartItems.length > 0 && (
                                <span className="bg-rose-500 rounded-full w-5 h-5 absolute -top-2 -right-2 text-xs flex items-center justify-center">{dataCart.cartItems.length}</span>
                            )}
                            <ShoppingCart size={30} />
                        </button>
                    </div>

                    <HeaderMenu data={data.catalogCategory} selectedCategory={data.selectedCategory} selectCategory={actionList.selectCategory} />
                </HeaderCatalog>

                <main className="flex-1 flex flex-col items-center">
                    <ContentLayout addClass="pt-6 px-4">
                        <CatalogProductList data={data.dataCatalog} actionAddCart={actionCart.addCart} />
                    </ContentLayout>
                </main>
                
                <div className="hidden lg:flex flex-col items-center ">
                    <ContentLayout >
                        <Footer />
                    </ContentLayout>
                </div>
                
                <FooterCatalog totalItems={dataCart.cartItems.length} toggleSidebar={() => toggleSidebar()} />
            </div>
        </>
    )
}