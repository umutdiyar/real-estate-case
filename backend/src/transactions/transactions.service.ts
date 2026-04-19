import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AgentsService } from 'src/agents/agents.service';
import { CommissionCalculatorService } from './services/commission-calculator.service';
import { StageTransitionService } from './services/stage-transition.service';
import { UpdateTransactionStageDto } from './dto/update-transaction-stage.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private agentsService: AgentsService,
    private commissionCalculator: CommissionCalculatorService,
    private stageTransitionService: StageTransitionService,
  ) {}

  async create(dto: CreateTransactionDto) {
    await this.agentsService.findById(dto.listingAgentId);
    await this.agentsService.findById(dto.sellingAgentId);

    if (dto.totalServiceFee <= 0) {
      throw new BadRequestException('Hizmet ücreti pozitif bir sayı olmalıdır');
    }

    const breakdown = this.commissionCalculator.calculate(
      dto.totalServiceFee,
      dto.listingAgentId,
      dto.sellingAgentId,
    );

    const transaction = new this.transactionModel({
      ...dto,
      commissionBreakdown: breakdown,
    });

    return transaction.save();
  }

  async findAll() {
    return this.transactionModel
      .find()
      .populate('listingAgentId', 'fullName')
      .populate('sellingAgentId', 'fullName')
      .sort({ createdAt: -1 });
  }

  async findById(id: string) {
    const tx = await this.transactionModel
      .findById(id)
      .populate('listingAgentId', 'fullName')
      .populate('sellingAgentId', 'fullName');

    if (!tx) throw new NotFoundException('İşlem bulunamadı!');
    return tx;
  }

  async updateStage(id: string, dto: UpdateTransactionStageDto) {
    const tx = await this.transactionModel.findById(id);
    if (!tx) throw new NotFoundException('İşlem bulunamadı!');
    this.stageTransitionService.validate(tx.stage, dto.stage);
    tx.stage = dto.stage;
    return tx.save();
  }
}
