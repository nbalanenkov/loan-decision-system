package com.loan.decision.engine.model;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ApprovedLoanResponse extends LoanResponse {
    private final BigDecimal approvedLoanAmount;
    private final int approvedLoanPeriod;

    public ApprovedLoanResponse(BigDecimal approvedLoanAmount, int approvedLoanPeriod) {
        super(LoanDecision.APPROVED);
        this.approvedLoanAmount = approvedLoanAmount;
        this.approvedLoanPeriod = approvedLoanPeriod;
    }

}
