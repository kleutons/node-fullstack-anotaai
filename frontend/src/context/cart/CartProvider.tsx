import { ReactNode, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CatalogCartItemType, CatalogItemType } from "../../types/CatalogyType";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    
    // Armazena a lista do carrinho
    const [cartItems, setCartItems] = useState<CatalogCartItemType[]>(() => {
        // Obtém os itens do carrinho do localStorage ao inicializar o estado
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });
    
    const [subtotal, setSubtotal] = useState<number>(() => {
        // Calcula o subtotal inicial dos itens do carrinho ao inicializar o estado
        const savedCartItems = localStorage.getItem("cartItems");
        const items: CatalogCartItemType[] = savedCartItems ? JSON.parse(savedCartItems) : [];
        return items.reduce((total, item) => total + (item.quantity * item.price), 0);
    });

    // Lógica para adicionar itens ao carrinho
    const addCart = (newItem: CatalogItemType) => {
        setCartItems(prevCartItem => {
            const itemIndex = prevCartItem.findIndex(item => item.id === newItem.id);
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
        ), {
            style: {
                borderRadius: '10px',
                background: '#012751',
                color: '#fff',
            }
        });
    };

    // Lógica para atualizar a quantidade do item no carrinho
    const updateCartItemQty = (id: string, currentQuantity: number, isIncrement?: boolean) => {
        if (currentQuantity === 1 && !isIncrement) {
            const confirmed = confirm("Tem certeza que deseja remover esse item?");
            if (confirmed)
                setCartItems(cartItems.filter(item => id !== item.id));
                return;
        }

        setCartItems(prevCartItem => {
            return prevCartItem.map(item => {
                if (item.id === id) {
                    const updatedQuantity = updateQuantity(currentQuantity, isIncrement);
                    return { ...item, quantity: Math.max(updatedQuantity, 0) };
                }
                return item;
            });
        });
    };

    // Função auxiliar para atualizar quantidade
    const updateQuantity = (currentQuantity: number, isIncrement?: boolean) => {
        return isIncrement ? currentQuantity + 1 : currentQuantity - 1;
    };

    // Atualização do subtotal
    const updateSubTotal = () => {
        const subTotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
        setSubtotal(parseFloat(subTotal.toFixed(2)));
    };

    // Atualizar subtotal quando o carrinho é modificado
    useEffect(() => {
        // Salva os itens do carrinho no localStorage sempre que o estado mudar
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        // Atualizar subtotal
        updateSubTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    // Lógica para limpar o carrinho
    const clearCart = () => {
        setCartItems([]);
        setSubtotal(0);
    };

    // Armazena retorno das funções e estados
    const value = {
        dataCart: {
            cartItems,
            subtotal
        },
        actionCart: {
            addCart,
            updateCartItemQty,
            clearCart
        }
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
