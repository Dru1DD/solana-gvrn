import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Connection, GetVersionedBlockConfig } from '@solana/web3.js';
import { TransactionsDto } from '@solana-gvrn/solana/dto';

export interface SolanaService {
  getTransactionCountBySlot(slot: number): Promise<TransactionsDto>;
  getTransactionFromLatestBlock(): Promise<TransactionsDto>;
  isSlotConfirmed(slot: number): Promise<boolean>;
  getCurrentSlot(): Promise<number>;
}

@Injectable()
export class DefaultSolanaService implements SolanaService {
  private readonly solanaConnection: Connection;
  private readonly logger: Logger;

  private readonly config: GetVersionedBlockConfig = {
    maxSupportedTransactionVersion: 0,
    transactionDetails: 'full',
    rewards: false,
  };

  constructor(private readonly configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    this.solanaConnection = new Connection(rpcUrl, 'confirmed');
    this.logger = new Logger();
  }

  public async getTransactionCountBySlot(slot: number): Promise<TransactionsDto> {
    try {
      if (!slot || slot < 0) {
        throw new BadRequestException('Invalid slot number provided');
      }

      const block = await this.solanaConnection.getBlock(slot, this.config);

      if (!block) {
        this.logger.warn(`No block found for slot: ${slot}`);
        return {
          slot,
          transactionCount: 0,
        };
      }

      return {
        slot,
        transactionCount: block.transactions.length,
      };
    } catch (error) {
      this.logger.error('Failed in get transaction', (error as Error).message);
      throw new Error('Failed fetch transactions');
    }
  }

  public async getTransactionFromLatestBlock(): Promise<TransactionsDto> {
    try {
      const currentSlot = await this.getCurrentSlot();
      return await this.getTransactionCountBySlot(currentSlot);
    } catch (error) {
      this.logger.error('Failed fetch transaction from latest block', (error as Error).message);
      throw new Error('Failed fetch transaction from latest block');
    }
  }

  async isSlotConfirmed(slot: number): Promise<boolean> {
    try {
      const block = await this.solanaConnection.getBlock(slot, {
        transactionDetails: 'none',
      });
      return block !== null;
    } catch (error) {
      this.logger.error(`Error checking slot ${slot}:`, error);
      return false;
    }
  }

  async getCurrentSlot(): Promise<number> {
    return await this.solanaConnection.getSlot();
  }
}
