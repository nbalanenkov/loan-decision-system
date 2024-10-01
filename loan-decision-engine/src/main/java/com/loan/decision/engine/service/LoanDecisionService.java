package com.loan.decision.engine.service;

import com.loan.decision.engine.model.ApprovedLoanResponse;
import com.loan.decision.engine.model.LoanRequest;
import com.loan.decision.engine.model.LoanResponse;
import com.loan.decision.engine.model.RejectedLoanResponse;
import com.loan.decision.engine.util.PersonalCodeUtils;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

import static com.loan.decision.engine.util.RejectionReasonConstants.ACTIVE_DEBT;
import static com.loan.decision.engine.util.RejectionReasonConstants.NO_SUITABLE_LOAN_AMOUNT_AND_PERIOD;

@Service
public class LoanDecisionService {

    private static final BigDecimal MAX_LOAN_AMOUNT = BigDecimal.valueOf(10000);
    private static final BigDecimal MIN_LOAN_AMOUNT = BigDecimal.valueOf(2000);
    private static final BigDecimal LOAN_AMOUNT_STEP = BigDecimal.valueOf(100);
    private static final int MAX_LOAN_PERIOD = 60;
    private static final int LOAN_PERIOD_STEP = 6;

    public LoanResponse makeLoanDecision(LoanRequest loanRequest) {
        int loanPeriod = adjustLoanPeriod(loanRequest.loanPeriod());

        int creditModifier = PersonalCodeUtils.getCreditModifier(loanRequest.personalCode());

        if (creditModifier == 0) {
            return rejectedLoanResponse(ACTIVE_DEBT);
        }

        for (BigDecimal maxEligibleLoanAmount = MAX_LOAN_AMOUNT; maxEligibleLoanAmount.compareTo(MIN_LOAN_AMOUNT) > 0; maxEligibleLoanAmount = maxEligibleLoanAmount.subtract(LOAN_AMOUNT_STEP)) {
            if (isLoanEligible(creditModifier, maxEligibleLoanAmount, loanPeriod)) {
                return approvedLoanResponse(maxEligibleLoanAmount, loanPeriod);
            }
        }

        for (int newPeriod = loanPeriod; newPeriod <= MAX_LOAN_PERIOD; newPeriod += LOAN_PERIOD_STEP) {
            if (isLoanEligible(creditModifier, loanRequest.loanAmount(), newPeriod)) {
                return approvedLoanResponse(loanRequest.loanAmount(), newPeriod);
            }
        }

        return rejectedLoanResponse(NO_SUITABLE_LOAN_AMOUNT_AND_PERIOD);
    }

    private int adjustLoanPeriod(int loanPeriod) {
        if (loanPeriod % LOAN_PERIOD_STEP != 0) {
            return loanPeriod + (LOAN_PERIOD_STEP - (loanPeriod % LOAN_PERIOD_STEP));
        }
        return loanPeriod;
    }

    private LoanResponse rejectedLoanResponse(String reason) {
        return new RejectedLoanResponse(reason);
    }

    private LoanResponse approvedLoanResponse(BigDecimal approvedAmount, int approvedLoanPeriod) {
        return new ApprovedLoanResponse(approvedAmount.setScale(0, RoundingMode.DOWN), approvedLoanPeriod);
    }

    private boolean isLoanEligible(int creditModifier, BigDecimal loanAmount, int loanPeriod) {
        return calculateCreditScore(creditModifier, loanAmount, loanPeriod).compareTo(BigDecimal.ONE) >= 0;
    }

    private BigDecimal calculateCreditScore(int creditModifier, BigDecimal loanAmount, int loanPeriod) {
        return BigDecimal.valueOf(creditModifier)
                .divide(loanAmount, 6, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(loanPeriod));
    }

}
