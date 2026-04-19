import { Injectable, BadRequestException } from '@nestjs/common';
import { TransactionStage } from 'src/common/enums/transaction-stage.enum';

@Injectable()
export class StageTransitionService {
  private transitions: Record<TransactionStage, TransactionStage[]> = {
    [TransactionStage.AGREEMENT]: [TransactionStage.EARNEST_MONEY],
    [TransactionStage.EARNEST_MONEY]: [TransactionStage.TITLE_DEED],
    [TransactionStage.TITLE_DEED]: [TransactionStage.COMPLETED],
    [TransactionStage.COMPLETED]: [],
  };

  // private transitions = {
  //   agreement: ['earnest_money'],
  //   earnest_money: ['title_deed'],
  //   title_deed: ['completed'],
  //   completed: [],
  // };

  validate(current: TransactionStage, next: TransactionStage) {
    const allowed = this.transitions[current];

    if (!allowed.includes(next)) {
      throw new BadRequestException(
        `Geçersiz aşama geçişi ${current} to ${next}`,
      );
    }
  }
}
