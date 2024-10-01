package com.loan.decision.engine.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

@Getter
public class RejectedLoanResponse extends LoanResponse {
    private final String reason;

    @JsonCreator
    public RejectedLoanResponse(String reason) {
        super(LoanDecision.REJECTED);
        this.reason = reason;
    }

}
