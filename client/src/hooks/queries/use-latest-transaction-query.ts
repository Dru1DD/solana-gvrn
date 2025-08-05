import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Transactions } from '@/types/transactions';

const useLatestTransactionQuery = () => {
    return useQuery<Transactions>({
        queryKey: ['current-user'],
        queryFn: async () => (await api.get('/solana/transaction-from-latest')).data,
    });
};

export default useLatestTransactionQuery;
