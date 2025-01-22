import { useState } from "react";

export default function useTotal(){
    const [categories, setCategories] = useState<number>(0);
    const [products, setProducts] = useState<number>(0);

    return {categories, setCategories, products, setProducts}
}