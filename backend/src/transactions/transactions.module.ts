import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CommissionCalculatorService } from './services/commission-calculator.service';
import { StageTransitionService } from './services/stage-transition.service';
import { AgentsModule } from 'src/agents/agents.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
    AgentsModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    CommissionCalculatorService,
    StageTransitionService,
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
