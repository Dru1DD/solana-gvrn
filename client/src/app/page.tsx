'use client';

import Form from '@/components/form';
import useLatestTransactionQuery from '@/hooks/queries/use-latest-transaction-query';
import useTransactionBySlotMutation from '@/hooks/mutations/use-transaction-by-slot-mutation';
import TransactionsInfo from '../components/transactions-info';

export default function Home() {
  const { data: transactionsFromLatestBlock, isLoading } = useLatestTransactionQuery();
  const {
    data: transactionMutationData,
    mutateAsync: getTransactionBySlot,
    isPending,
  } = useTransactionBySlotMutation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-8 sm:p-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Transaction Explorer
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-8">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 shadow-2xl backdrop-blur-sm">
            <Form getTransactionBySlot={getTransactionBySlot} isLoading={isPending} />
          </div>

          {transactionMutationData && (
            <div className="animate-fade-in">
              <TransactionsInfo data={transactionMutationData} isDataLoading={isPending} />
            </div>
          )}

          {transactionsFromLatestBlock && (
            <div className="animate-fade-in">
              <TransactionsInfo data={transactionsFromLatestBlock} isDataLoading={isLoading} isLatestBlockInfo />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
