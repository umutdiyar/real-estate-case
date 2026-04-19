import { CommissionCalculatorService } from './commission-calculator.service';

describe('CommissionCalculatorService', () => {
  let service: CommissionCalculatorService;

  beforeEach(() => {
    service = new CommissionCalculatorService();
  });

  it('should calculate correctly when agents are different', () => {
    const result = service.calculate(10000, 'a', 'b');

    expect(result.agencyAmount).toBe(5000);
    expect(result.listingAgentAmount).toBe(2500);
    expect(result.sellingAgentAmount).toBe(2500);
    expect(result.totalAgentAmount).toBe(5000);
  });

  it('should calculate correctly when agents are the same', () => {
    const result = service.calculate(10000, 'a', 'a');

    expect(result.agencyAmount).toBe(5000);
    expect(result.listingAgentAmount).toBe(5000);
    expect(result.sellingAgentAmount).toBe(0);
    expect(result.totalAgentAmount).toBe(5000);
  });
});
