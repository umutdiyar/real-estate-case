import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TransactionStage } from 'src/common/enums/transaction-stage.enum';

export class UpdateTransactionStageDto {
  @ApiProperty({
    enum: TransactionStage,
    example: TransactionStage.EARNEST_MONEY,
    description: 'Bir sonraki işlem aşaması',
  })
  @IsEnum(TransactionStage)
  stage!: TransactionStage;
}
