import { createContext } from "react";
import { CatalogCartItemType, CatalogItemType } from "../../types/CatalogyType";

export interface CartContextType {
    dataCart: {
        cartItems: CatalogCartItemType[];
        subtotal: number;
    },
    actionCart: {
        addCart:  (newItem: CatalogItemType) => void;
        updateCartItemQty:  (id: string, currentQuantity: number, isIncrement?: boolean) => void;
        clearCart: () => void;
    }
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
