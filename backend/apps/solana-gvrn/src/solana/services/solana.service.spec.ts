import { Test, TestingModule } from '@nestjs/testing';
import { DefaultSolanaService } from './solana.service';
import { ConfigService } from '@nestjs/config';

const mockConnection = {
  getBlock: jest.fn(),
  getSlot: jest.fn(),
};

jest.mock('@solana/web3.js', () => {
  const original = jest.requireActual('@solana/web3.js');
  return {
    ...original,
    Connection: jest.fn().mockImplementation(() => mockConnection),
  };
});

describe('DefaultSolanaService', () => {
  let service: DefaultSolanaService;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    configServiceMock = {
      get: jest.fn().mockReturnValue('https://api.mainnet-beta.solana.com'),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultSolanaService, { provide: ConfigService, useValue: configServiceMock }],
    }).compile();

    service = module.get<DefaultSolanaService>(DefaultSolanaService);
  });

  describe('getTransactionCountBySlot', () => {
    it('should return transaction count for valid slot', async () => {
      mockConnection.getBlock.mockResolvedValueOnce({
        transactions: [{}, {}, {}],
      });

      const result = await service.getTransactionCountBySlot(123);
      expect(result).toEqual({ slot: 123, transactionCount: 3 });
      expect(mockConnection.getBlock).toHaveBeenCalledWith(123, {
        maxSupportedTransactionVersion: 0,
        rewards: false,
        transactionDetails: 'full',
      });
    });

    it('should return 0 if block is null', async () => {
      mockConnection.getBlock.mockResolvedValueOnce(null);

      const result = await service.getTransactionCountBySlot(999);
      expect(result).toEqual({ slot: 999, transactionCount: 0 });
      expect(mockConnection.getBlock).toHaveBeenCalledWith(999, {
        maxSupportedTransactionVersion: 0,
        rewards: false,
        transactionDetails: 'full',
      });
    });

    it('should throw BadRequest for invalid slot', async () => {
      await expect(service.getTransactionCountBySlot(-1)).rejects.toThrow('Failed fetch transactions');
    });
  });

  describe('getTransactionFromLatestBlock', () => {
    it('should return transaction count from latest slot', async () => {
      mockConnection.getSlot.mockResolvedValueOnce(456);
      mockConnection.getBlock.mockResolvedValueOnce({
        transactions: [{}],
      });

      const result = await service.getTransactionFromLatestBlock();
      expect(result).toEqual({ slot: 456, transactionCount: 1 });
      expect(mockConnection.getSlot).toHaveBeenCalled();
      expect(mockConnection.getBlock).toHaveBeenCalledWith(456, {
        maxSupportedTransactionVersion: 0,
        rewards: false,
        transactionDetails: 'full',
      });
    });
  });

  describe('isSlotConfirmed', () => {
    it('should return true if block exists', async () => {
      mockConnection.getBlock.mockResolvedValueOnce({});

      const result = await service.isSlotConfirmed(100);
      expect(result).toBe(true);
      expect(mockConnection.getBlock).toHaveBeenCalledWith(100, {
        transactionDetails: 'none',
      });
    });

    it('should return false if getBlock throws', async () => {
      mockConnection.getBlock.mockRejectedValueOnce(new Error('fail'));

      const result = await service.isSlotConfirmed(200);
      expect(result).toBe(false);
      expect(mockConnection.getBlock).toHaveBeenCalledWith(200, {
        transactionDetails: 'none',
      });
    });
  });

  describe('getCurrentSlot', () => {
    it('should return current slot', async () => {
      mockConnection.getSlot.mockResolvedValueOnce(789);

      const result = await service.getCurrentSlot();
      expect(result).toBe(789);
      expect(mockConnection.getSlot).toHaveBeenCalled();
    });
  });
});
