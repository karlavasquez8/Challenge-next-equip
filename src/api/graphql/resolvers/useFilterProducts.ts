import { useQuery } from "@apollo/client";
import { queryFilterProducts } from "../queries/filterProducts";
import { IProduct } from "@/interfaces/product";
import type { QueryResult } from "@apollo/client/react/types/types";

export interface useFilterProductsData {
  products: IProduct[];
}

interface useFilterProductsVars {
  accountId: string;
  page: number;
}

export const useFilterProducts = (
  accountId: string,
  page: number
): QueryResult<useFilterProductsData, useFilterProductsVars> => {
  return useQuery<useFilterProductsData, useFilterProductsVars>(
    queryFilterProducts,
    {
      context: { clientName: "api" },
      variables: { accountId, page },
    }
  );
};
