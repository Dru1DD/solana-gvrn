import { Module } from '@nestjs/common';
import { DefaultSolanaService } from './services';
import { SolanaController } from './controllers';
import SolanaModuleTokens from './solana.module.tokens';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SolanaModuleTokens.Services.SolanaService,
      useClass: DefaultSolanaService,
    },
  ],
  controllers: [SolanaController],
  exports: [SolanaModuleTokens.Services.SolanaService],
})
export class SolanaModule {
  public static Tokens = SolanaModuleTokens;
}
