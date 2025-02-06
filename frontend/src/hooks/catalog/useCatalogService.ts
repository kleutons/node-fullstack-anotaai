import {useMemo } from "react";
import CatalogService from "../../services/CatalogService";

export const useCatalogService = () => {

    // Memoriza a instância de CatalogService
    const catalogService = useMemo(() => new CatalogService(), []);

    return catalogService;
};
