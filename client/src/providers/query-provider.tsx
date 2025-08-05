'use client';
import { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
