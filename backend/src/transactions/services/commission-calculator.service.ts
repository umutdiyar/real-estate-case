import { Injectable } from '@nestjs/common';

@Injectable()
export class CommissionCalculatorService {
  calculate(
    totalServiceFee: number,
    listingAgentId: string,
    sellingAgentId: string,
  ) {
    const agencyAmount = totalServiceFee * 0.5;
    const totalAgentAmount = totalServiceFee - agencyAmount;

    if (listingAgentId === sellingAgentId) {
      return {
        agencyAmount,
        listingAgentAmount: totalAgentAmount,
        sellingAgentAmount: 0,
        totalAgentAmount,
        explanation:
          'Emlak ilanı ve satış temsilcisi aynı kişidir. Tüm komisyon tek bir temsilciye tahsis edilmiştir.',
        calculatedAt: new Date(),
      };
    }

    const half = totalAgentAmount / 2;

    return {
      agencyAmount,
      listingAgentAmount: half,
      sellingAgentAmount: half,
      totalAgentAmount,
      explanation:
        'Komisyon payı, ilan veren ve satış yapan emlakçılar arasında eşit olarak bölündü.',
      calculatedAt: new Date(),
    };
  }
}
