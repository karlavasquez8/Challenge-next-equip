import {useLazyQuery, useQuery} from "@apollo/client";
import {queryFindAccount} from "@/api/graphql/queries/findAccount";

export const useFindAccount = () => {
    return useLazyQuery(queryFindAccount,{
        context: { clientName: "api" }
    });
};