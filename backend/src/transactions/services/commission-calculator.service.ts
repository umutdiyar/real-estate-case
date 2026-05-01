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
          'The person responsible for the real estate listing is the same as the sales representative. The entire commission is paid to a single representative.',
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
        'The commission is split equally between the listing and selling agents.',
      calculatedAt: new Date(),
    };
  }
}
