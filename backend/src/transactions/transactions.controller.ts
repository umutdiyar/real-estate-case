import { Controller, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionStageDto } from './dto/update-transaction-stage.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni bir işlem oluştur' })
  create(@Body() dto: CreateTransactionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm işlemleri listele' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID ile işlem detaylarını getir' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id/stage')
  @ApiOperation({ summary: 'İşlem aşamasını güncelle' })
  updateStage(@Param('id') id: string, @Body() dto: UpdateTransactionStageDto) {
    return this.service.updateStage(id, dto);
  }
}
