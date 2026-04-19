import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { TransactionStage } from '../../common/enums/transaction-stage.enum';
import { TransactionType } from '../../common/enums/transaction-type.enum';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ _id: false })
export class CommissionBreakdown {
  @Prop({ required: true, min: 0 })
  agencyAmount!: number;

  @Prop({ required: true, min: 0 })
  listingAgentAmount!: number;

  @Prop({ required: true, min: 0 })
  sellingAgentAmount!: number;

  @Prop({ required: true, min: 0 })
  totalAgentAmount!: number;

  @Prop({ required: true })
  explanation!: string;

  @Prop({ required: true, default: Date.now })
  calculatedAt!: Date;
}

const CommissionBreakdownSchema =
  SchemaFactory.createForClass(CommissionBreakdown);

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, trim: true })
  propertyAddress!: string;

  @Prop({
    required: true,
    enum: Object.values(TransactionType),
  })
  transactionType!: TransactionType;

  @Prop({ required: true, min: 0 })
  totalServiceFee!: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  })
  listingAgentId!: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  })
  sellingAgentId!: Types.ObjectId;

  @Prop({
    required: true,
    enum: Object.values(TransactionStage),
    default: TransactionStage.AGREEMENT,
  })
  stage!: TransactionStage;

  @Prop({
    type: CommissionBreakdownSchema,
    required: false,
  })
  commissionBreakdown?: CommissionBreakdown;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
