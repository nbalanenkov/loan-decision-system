package com.loan.decision.engine.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum LoanDecision {
    @JsonProperty(value = "approved")
    APPROVED,
    @JsonProperty(value = "rejected")
    REJECTED
}
