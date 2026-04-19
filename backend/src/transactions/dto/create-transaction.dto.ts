import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TransactionType } from 'src/common/enums/transaction-type.enum';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Kadikoy Daire Satışı',
    description: 'Transaction Title',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title!: string;

  @ApiProperty({
    example: 'Kadıköy, İstanbul, Turkey',
    description: 'Daire Adresi',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  propertyAddress!: string;

  @ApiProperty({
    example: TransactionType.SALE,
    description: 'Transaction Type',
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  transactionType!: TransactionType;

  @ApiProperty({
    example: 100000,
    description: 'İşlem Ücreti',
  })
  @IsNumber()
  @IsPositive()
  totalServiceFee!: number;

  @ApiProperty({
    example: '662fc4f2d9d1d15d3c2d4a11',
    description: 'Temsilci ID',
  })
  @IsMongoId()
  listingAgentId!: string;

  @ApiProperty({
    example: '5f8d0d55b54764421b7156c5',
    description: 'Satış Temsilci ID',
  })
  @IsMongoId()
  sellingAgentId!: string;
}
