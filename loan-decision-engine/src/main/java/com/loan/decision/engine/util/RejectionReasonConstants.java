package com.loan.decision.engine.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RejectionReasonConstants {
    public static final String NO_SUITABLE_LOAN_AMOUNT_AND_PERIOD = "No suitable loan amount and loan period were found with provided parameters";
    public static final String ACTIVE_DEBT = "There is an active debt associated with provided personal code";
}
