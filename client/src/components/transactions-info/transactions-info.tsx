import { Clock, Search } from 'lucide-react';
import Loading from '@/components/loading';
import { Transactions } from '@/types/transactions';

interface TransactionsInfoProps {
  isLatestBlockInfo?: boolean;
  isDataLoading: boolean;
  data: Transactions;
}

const TransactionsInfo = ({ isDataLoading, isLatestBlockInfo, data }: TransactionsInfoProps) => {
  if (isDataLoading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl backdrop-blur-sm">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center justify-center">
              {isLatestBlockInfo ? (
                <>
                  <Clock className="w-5 h-5" /> <span className="ml-2">Latest Block Transaction Couns</span>
                </>
              ) : (
                <>
                  {' '}
                  <Search className="w-5 h-5" /> <span className="ml-2">Block Details</span>{' '}
                </>
              )}
            </h2>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium"> {isLatestBlockInfo && 'Latest'} Slot Number</span>
                <span className="text-white font-mono text-lg">{data.slot}</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">Transaction Count</span>
                <span className="text-emerald-400 font-mono text-lg font-semibold">{data.transactionCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsInfo;
