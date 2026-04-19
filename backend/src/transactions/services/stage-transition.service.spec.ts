import { StageTransitionService } from './stage-transition.service';
import { TransactionStage } from '../../common/enums/transaction-stage.enum';

describe('StageTransitionService', () => {
  let service: StageTransitionService;

  beforeEach(() => {
    service = new StageTransitionService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should allow valid transitions', () => {
    expect(() =>
      service.validate(
        TransactionStage.AGREEMENT,
        TransactionStage.EARNEST_MONEY,
      ),
    ).not.toThrow();

    expect(() =>
      service.validate(
        TransactionStage.EARNEST_MONEY,
        TransactionStage.TITLE_DEED,
      ),
    ).not.toThrow();

    expect(() =>
      service.validate(TransactionStage.TITLE_DEED, TransactionStage.COMPLETED),
    ).not.toThrow();
  });

  it('should reject invalid transitions', () => {
    expect(() =>
      service.validate(TransactionStage.AGREEMENT, TransactionStage.COMPLETED),
    ).toThrow();

    expect(() =>
      service.validate(TransactionStage.COMPLETED, TransactionStage.AGREEMENT),
    ).toThrow();

    expect(() =>
      service.validate(
        TransactionStage.EARNEST_MONEY,
        TransactionStage.AGREEMENT,
      ),
    ).toThrow();
  });
});
