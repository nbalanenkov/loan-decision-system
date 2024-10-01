export enum LoanDecision {
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface LoanRequest {
  personalCode: string;
  loanAmount: number;
  loanPeriod: number;
}

export interface ApprovedLoanResponse {
  decision: LoanDecision.Approved;
  approvedLoanAmount: number;
  approvedLoanPeriod: number;
}

export interface RejectedLoanResponse {
  decision: LoanDecision.Rejected;
  reason: string;
}

export type LoanResponse = ApprovedLoanResponse | RejectedLoanResponse | null;
