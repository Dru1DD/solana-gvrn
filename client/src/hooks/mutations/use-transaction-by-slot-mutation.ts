import { useMutation, DefaultError } from "@tanstack/react-query"
import { api } from "@/lib/api-client";
import { Transactions } from "@/types/transactions"

interface MutationParams {
    slot: number;
}

const useTransactionBySlotMutation = () => {
    return useMutation<Transactions, DefaultError, MutationParams>({
        mutationFn: (params: MutationParams) => api.get(`transaction-count?slot=${params.slot}`)
    })
}

export default useTransactionBySlotMutation
