import { useMutation, DefaultError } from "@tanstack/react-query"
import { api } from "@/lib/api-client";
import { Transactions } from "@/types/transactions"

export interface MutationParams {
    slot: number;
}


const useTransactionBySlotMutation = () => {
    return useMutation<Transactions, DefaultError, MutationParams>({
        mutationFn: async (params: MutationParams) => (await api.get(`/solana/transaction-count?slot=${params.slot}`)).data
    })
}

export default useTransactionBySlotMutation
