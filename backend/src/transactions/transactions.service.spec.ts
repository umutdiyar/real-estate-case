import { NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CommissionCalculatorService } from './services/commission-calculator.service';
import { StageTransitionService } from './services/stage-transition.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  const mockTransactionModel = {
    find: jest.fn(),
    findById: jest.fn(),
  } as any;

  const mockAgentsService = {
    findById: jest.fn(),
  };

  const mockCommissionCalculator = {
    calculate: jest.fn(),
  };

  const mockStageService = {
    validate: jest.fn(),
  };

  beforeEach(() => {
    service = new TransactionsService(
      mockTransactionModel,
      mockAgentsService as any,
      mockCommissionCalculator as any,
      mockStageService as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw when listing agent is not found', async () => {
    mockAgentsService.findById.mockRejectedValueOnce(
      new NotFoundException('Agent bulunamadı'),
    );

    await expect(
      service.create({
        title: 'Test',
        propertyAddress: 'Istanbul',
        type: 'sale' as any,
        totalServiceFee: 10000,
        listingAgentId: 'missing-agent',
        sellingAgentId: 'selling-agent',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
