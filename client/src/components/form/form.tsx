'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import Loading from '@/components/loading';
import { MutationParams } from '@/hooks/mutations/use-transaction-by-slot-mutation';
import { Search } from 'lucide-react';

interface FormData {
  slot: number;
}

interface FormProps {
  getTransactionBySlot: (params: MutationParams) => void;
  isLoading: boolean;
}

const Form = ({ getTransactionBySlot, isLoading }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    slot: 10,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await getTransactionBySlot({ slot: formData.slot });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Search Transactions</h2>
        <p className="text-slate-400">Enter a slot number to retrieve transaction data</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            type="number"
            label="Slot Number"
            placeholder="Enter slot number (e.g., 12345)"
            value={formData.slot}
            onChange={handleChange}
            name="slot"
            className="w-full"
          />
          <div className="text-xs text-slate-500">Slot numbers represent block positions in the Solana blockchain</div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loading />
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Search />
                <span>Search Transactions</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
