import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Transactions } from '@/types/transactions';

const useLatestTransactionQuery = () => {
    return useQuery({
        queryKey: ['current-user'],
        queryFn: () => api.get<Transactions>('/transaction-from-latest')
    });
};

export default useLatestTransactionQuery;
