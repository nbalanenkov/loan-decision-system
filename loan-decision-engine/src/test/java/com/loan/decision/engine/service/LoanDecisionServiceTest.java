package com.loan.decision.engine.service;

import com.loan.decision.engine.model.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoanDecisionServiceTest {

    private final LoanDecisionService loanDecisionService = new LoanDecisionService();

    @ParameterizedTest
    @CsvSource({
            "49002010976, 5000.50, 12, 5000, 54",
            "49002010976, 3500, 21, 2400, 24",
            "49002010976, 2000, 34, 3600, 36",
            "49002010987, 7000, 12, 3500, 12",
            "49002010987, 8000.30, 19, 7200, 24",
            "49002010987, 9000.90, 36, 10000, 36",
            "49002010998, 5000, 36, 10000, 36",
            "49002010998, 7000.42, 24, 10000, 24",
            "49002010998, 10000, 12, 10000, 12"
    })
    public void whenRequestIsValidAndLoanIsApproved_thenApprovedLoanResponseShouldBeReturned(String personalCode, BigDecimal loanAmount, int loanPeriod, BigDecimal approvedLoanAmount, int approvedLoanPeriod) {
        ApprovedLoanResponse approvedLoanResponse = (ApprovedLoanResponse) getLoanResponse(personalCode, loanAmount, loanPeriod);

        assertEquals(LoanDecision.APPROVED, approvedLoanResponse.getDecision());
        assertEquals(approvedLoanAmount, approvedLoanResponse.getApprovedLoanAmount());
        assertEquals(approvedLoanPeriod, approvedLoanResponse.getApprovedLoanPeriod());
    }

    @ParameterizedTest
    @CsvSource({
            "49002010965, 2000, 12, There is an active debt associated with provided personal code",
            "49002010976, 6500, 12, No suitable loan amount and loan period were found with provided parameters"
    })
    public void whenRequestIsValidAndLoanIsNotApproved_thenRejectedLoanResponseShouldBeReturned(String personalCode, BigDecimal loanAmount, int loanPeriod, String expectedRejectionReason) {
        RejectedLoanResponse rejectedLoanResponse = (RejectedLoanResponse) getLoanResponse(personalCode, loanAmount, loanPeriod);

        assertEquals(LoanDecision.REJECTED, rejectedLoanResponse.getDecision());
        assertEquals(expectedRejectionReason, rejectedLoanResponse.getReason());
    }

    private LoanResponse getLoanResponse(String personalCode, BigDecimal loanAmount, int loanPeriod) {
        LoanRequest loanRequest = new LoanRequest(personalCode, loanAmount, loanPeriod);

        return loanDecisionService.makeLoanDecision(loanRequest);
    }
}
