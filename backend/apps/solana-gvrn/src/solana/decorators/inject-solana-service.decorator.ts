import { Inject } from '@nestjs/common';
import SolanaModuleTokens from '@solana-gvrn/solana/solana.module.tokens';

const InjectSolanaService = () => {
  return Inject(SolanaModuleTokens.Services.SolanaService);
};

export default InjectSolanaService;
