package com.loan.decision.engine.model;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record LoanRequest(
        @Pattern(regexp = "^[0-9]+$", message = "Personal code can only contain numbers")
        @Size(min = 11, max = 11, message = "Personal code must be exactly 11 digits long")
        @NotNull(message = "Personal code cannot be null")
        String personalCode,

        @Min(value = 2000, message = "Loan amount must be at least 2000")
        @Max(value = 10000, message = "Loan amount must not exceed 10000")
        @NotNull(message = "Loan amount cannot be null")
        BigDecimal loanAmount,

        @Min(value = 12, message = "Loan period must be at least 12 months")
        @Max(value = 60, message = "Loan period must not exceed 60 months")
        @NotNull(message = "Loan period cannot be null")
        Integer loanPeriod
) {}
