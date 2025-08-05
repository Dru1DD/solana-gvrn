import { Controller, Get, Query } from '@nestjs/common';
import { SolanaService } from '@solana-gvrn/solana/services';
import { InjectSolanaService } from '@solana-gvrn/solana/decorators';

@Controller('solana')
export class SolanaController {
  constructor(@InjectSolanaService() private readonly solanaService: SolanaService) {}

  @Get('transaction-count')
  async getTransactionCount(@Query('slot') slot: string) {
    const slotNumber = parseInt(slot, 10);

    if (isNaN(slotNumber)) {
      return { error: 'Invalid slot number' };
    }

    return await this.solanaService.getTransactionCountBySlot(slotNumber);
  }

  @Get('transaction-from-latest')
  async getTransactionFromLatestSlot() {
    return await this.solanaService.getTransactionFromLatestBlock();
  }
}
