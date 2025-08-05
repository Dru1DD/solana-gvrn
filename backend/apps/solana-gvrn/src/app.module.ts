import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SolanaModule } from './solana';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SolanaModule],
})
export class AppModule {}
