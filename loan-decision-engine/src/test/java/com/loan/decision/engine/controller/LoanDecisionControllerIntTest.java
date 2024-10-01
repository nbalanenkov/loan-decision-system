package com.loan.decision.engine.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.loan.decision.engine.model.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class LoanDecisionControllerIntTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @ParameterizedTest
    @CsvSource({
            "49002010976, 5000.58, 12, 5000, 54",
            "49002010976, 3500.10, 24, 2400, 24",
            "49002010976, 2000.02138, 36, 3600, 36",
            "49002010987, 7000.5, 12, 3500, 12",
            "49002010987, 8000, 24, 7200, 24",
            "49002010987, 9000.15821, 31, 10000, 36",
            "49002010998, 5000, 32, 10000, 36",
            "49002010998, 7000.784534, 21, 10000, 24"
    })
    public void whenRequestIsValidAndLoanIsApproved_thenPositiveResponseShouldBeSent(String personalCode, BigDecimal loanAmount, int loanPeriod, BigDecimal approvedLoanAmount, int approvedLoanPeriod) throws Exception {
        MvcResult mvcResult = postLoanRequest(personalCode, loanAmount, loanPeriod);

        ApprovedLoanResponse approvedLoanResponse = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), ApprovedLoanResponse.class);

        assertEquals(LoanDecision.APPROVED, approvedLoanResponse.getDecision());
        assertEquals(approvedLoanAmount, approvedLoanResponse.getApprovedLoanAmount());
        assertEquals(approvedLoanPeriod, approvedLoanResponse.getApprovedLoanPeriod());
    }

    @ParameterizedTest
    @CsvSource({
            "49002010965, 2000, 12, There is an active debt associated with provided personal code",
            "49002010965, 2000, 24, There is an active debt associated with provided personal code",
            "49002010965, 2000, 36, There is an active debt associated with provided personal code",
            "49002010976, 6500, 12, No suitable loan amount and loan period were found with provided parameters",
            "49002010976, 7000, 12, No suitable loan amount and loan period were found with provided parameters",
            "49002010976, 8000, 12, No suitable loan amount and loan period were found with provided parameters",
    })
    public void whenRequestIsValidAndLoanIsNotApproved_thenNegativeResponseShouldBeSent(String personalCode, BigDecimal loanAmount, int loanPeriod, String expectedRejectionReason) throws Exception {
        MvcResult mvcResult = postLoanRequest(personalCode, loanAmount, loanPeriod);

        RejectedLoanResponse rejectedLoanResponse = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), RejectedLoanResponse.class);

        assertEquals(LoanDecision.REJECTED, rejectedLoanResponse.getDecision());
        assertEquals(expectedRejectionReason, rejectedLoanResponse.getReason());
    }

    private MvcResult postLoanRequest(String personalCode, BigDecimal loanAmount, int loanPeriod) throws Exception {
        LoanRequest loanRequest = new LoanRequest(personalCode, loanAmount, loanPeriod);

        String requestJson = objectMapper.writeValueAsString(loanRequest);

        return mockMvc.perform(post("/loan-decision")
                        .contentType("application/json")
                        .content(requestJson))
                .andExpect(status().isOk()).andReturn();
    }
}
