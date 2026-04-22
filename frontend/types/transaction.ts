export type TransactionType = "sale" | "rental";

export type TransactionStage =
  | "agreement"
  | "earnest_money"
  | "title_deed"
  | "completed";

export interface CommissionBreakdown {
  agencyAmount: number;
  listingAgentAmount: number;
  sellingAgentAmount: number;
  totalAgentAmount: number;
  explanation: string;
  calculatedAt: string;
}

export interface TransactionAgentRef {
  _id: string;
  fullName: string;
}

export interface Transaction {
  _id: string;
  title: string;
  propertyAddress: string;
  type: TransactionType;
  totalServiceFee: number;
  listingAgentId: string | TransactionAgentRef;
  sellingAgentId: string | TransactionAgentRef;
  stage: TransactionStage;
  commissionBreakdown?: CommissionBreakdown;
  createdAt?: string;
  updatedAt?: string;
}
