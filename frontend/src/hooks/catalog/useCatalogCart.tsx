import { useEffect, useState } from "react";
import { CatalogCartItemType, CatalogItemType } from "../../types/CatalogyType";
import toast from "react-hot-toast";
import { X } from "lucide-react";


// Hook para listar carrinho
export const useCatalogCart = () => {

    // Armazena a lista do carrinho
    const [cartItem, setCartItem] = useState<CatalogCartItemType[]>([])
    const [subtotal, setSubTotal] = useState<number>(0);

    // Função para adicionar item ao carrinho
    const addCart = (newItem:CatalogItemType) => {
        setCartItem(prevCartItem => {
          const itemIndex = prevCartItem.findIndex(item => item.id === newItem.id);
          //localizar item 
          if (itemIndex !== -1) {
            // Item Existente: Incrementa a quantidade
            return prevCartItem.map((item, index) => {
              if (index === itemIndex) {
                const updatedQuantity = updateQuantity(item.quantity, true);
                return { ...item, quantity: updatedQuantity };
              }
              return item;
            });
          } else {
            // Novo Item: Adiciona ao carrinho
            return [...prevCartItem, { ...newItem, quantity: 1 }];
          }
        });

        // Notificação de sucesso
        toast.success((t) => (
            <div className="w-48 flex gap-2 justify-between">  
                <div className="flex-1">
                    <p>{newItem.title}</p>
                    <p className="text-sm"><b>Adicionado ao carrinho!</b></p>
                </div>
                <button onClick={() => toast.dismiss(t.id)}>
                    <X size={15} />
                </button>
            </div>
        ),{
            style:{
                borderRadius: '10px',
                background: '#012751',
                color: '#fff',
            }
        });
    };

    // Função para atualizar a quantidade do item no carrinho
    const updateCartItemQty = (id:string, currentQuantity:number, isIncrement?:boolean) => {
        // Confirmação para remover item
        if (currentQuantity === 1 && !isIncrement) {
            const confirmed = confirm("Tem certeza que deseja remover esse item?");
            if (confirmed)
                setCartItem(cartItem.filter(item => id !== item.id));
                return;
        }

        // Atualização da quantidade
        setCartItem(prevCartItem => {
            return prevCartItem.map(item => {
            if (item.id === id) {
                const updatedQuantity = updateQuantity(currentQuantity, isIncrement);
                return { ...item, quantity: Math.max(updatedQuantity, 0) }; //Evita quantidades negativas
            }
            return item;
            })
        });
    };

    // Função auxiliar para atualizar quantidade
    const updateQuantity = (currentQuantity:number, isIncrement?:boolean) => {
        if(isIncrement)
            return currentQuantity + 1;
        
        return currentQuantity - 1;
    };

    // Atualização do subtotal
    const updateSubTotal = () => {
        const subTotal = cartItem.reduce((total,item) => total + ( item.quantity * item.price ) , 0);
        setSubTotal(parseFloat(subTotal.toFixed(2)));
    }

    // Atualizar subtotal quando o carrinho é modificado
    useEffect(() => {
        updateSubTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItem]);

     // Retorno das funções e estados
    return {
        dataCart: {
            cartItem,
            subtotal
        },
        actionCart:{
            addCart,
            updateCartItemQty
        }
    };
};