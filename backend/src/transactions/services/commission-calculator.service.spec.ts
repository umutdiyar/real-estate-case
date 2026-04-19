import { CommissionCalculatorService } from './commission-calculator.service';

describe('CommissionCalculatorService', () => {
  let service: CommissionCalculatorService;

  beforeEach(() => {
    service = new CommissionCalculatorService();
  });

  it('should split commission equally when agents are different', () => {
    const result = service.calculate(10000, 'agent-1', 'agent-2');

    expect(result.agencyAmount).toBe(5000);
    expect(result.totalAgentAmount).toBe(5000);
    expect(result.listingAgentAmount).toBe(2500);
    expect(result.sellingAgentAmount).toBe(2500);
  });

  it('should assign full agent portion to one agent when both roles belong to same person', () => {
    const result = service.calculate(10000, 'agent-1', 'agent-1');

    expect(result.agencyAmount).toBe(5000);
    expect(result.totalAgentAmount).toBe(5000);
    expect(result.listingAgentAmount).toBe(5000);
    expect(result.sellingAgentAmount).toBe(0);
  });
});
