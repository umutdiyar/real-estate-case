import { StageTransitionService } from './stage-transition.service';
import { TransactionStage } from '../../common/enums/transaction-stage.enum';

describe('StageTransitionService', () => {
  let service: StageTransitionService;

  beforeEach(() => {
    service = new StageTransitionService();
  });

  it('should allow valid transition: agreement -> earnest_money', () => {
    expect(() =>
      service.validate(
        TransactionStage.AGREEMENT,
        TransactionStage.EARNEST_MONEY,
      ),
    ).not.toThrow();
  });

  it('should allow valid transition: earnest_money -> title_deed', () => {
    expect(() =>
      service.validate(
        TransactionStage.EARNEST_MONEY,
        TransactionStage.TITLE_DEED,
      ),
    ).not.toThrow();
  });

  it('should allow valid transition: title_deed -> completed', () => {
    expect(() =>
      service.validate(TransactionStage.TITLE_DEED, TransactionStage.COMPLETED),
    ).not.toThrow();
  });

  it('should reject invalid transition: agreement -> completed', () => {
    expect(() =>
      service.validate(TransactionStage.AGREEMENT, TransactionStage.COMPLETED),
    ).toThrow();
  });

  it('should reject invalid transition: completed -> agreement', () => {
    expect(() =>
      service.validate(TransactionStage.COMPLETED, TransactionStage.AGREEMENT),
    ).toThrow();
  });
});
