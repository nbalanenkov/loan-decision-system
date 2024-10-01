package com.loan.decision.engine.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.loan.decision.engine.model.ErrorResponse;
import com.loan.decision.engine.model.LoanRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
public class GlobalExceptionHandlerIntTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final String API_ENDPOINT = "/loan-decision";

    @ParameterizedTest
    @CsvSource({
            "49002010976, 1000, 12, Loan amount must be at least 2000",
            "49002010976, 11000, 12, Loan amount must not exceed 10000"
    })
    public void whenInvalidLoanAmount_thenErrorResponseIsSent(String personalCode, BigDecimal loanAmount, int loanPeriod, String expectedErrorMessage) throws Exception {
        ErrorResponse errorResponse = performLoanRequest(API_ENDPOINT, personalCode, loanAmount, loanPeriod);

        assertEquals(expectedErrorMessage, errorResponse.getMessages().getFirst());
        assertEquals(HttpStatus.BAD_REQUEST.value(), errorResponse.getStatus());
    }

    @ParameterizedTest
    @CsvSource({
            "49002010976, 2000, 10, Loan period must be at least 12 months",
            "49002010976, 2000, 65, Loan period must not exceed 60 months"
    })
    public void whenInvalidLoanPeriod_thenErrorResponseIsSent(String personalCode, BigDecimal loanAmount, int loanPeriod, String expectedErrorMessage) throws Exception {
        ErrorResponse errorResponse = performLoanRequest(API_ENDPOINT, personalCode, loanAmount, loanPeriod);

        assertEquals(expectedErrorMessage, errorResponse.getMessages().getFirst());
        assertEquals(HttpStatus.BAD_REQUEST.value(), errorResponse.getStatus());
    }

    @ParameterizedTest
    @CsvSource({
            "140912439102, 9000, 36, Personal code must be exactly 11 digits long",
            "asdasd9as=d, 8000, 24, Personal code can only contain numbers"
    })
    public void whenPersonalCodeIsInvalid_thenErrorResponseIsSent(String personalCode, BigDecimal loanAmount, int loanPeriod, String expectedErrorMessage) throws Exception {
        ErrorResponse errorResponse = performLoanRequest(API_ENDPOINT, personalCode, loanAmount, loanPeriod);

        assertEquals(expectedErrorMessage, errorResponse.getMessages().getFirst());
        assertEquals(HttpStatus.BAD_REQUEST.value(), errorResponse.getStatus());
    }

    @Test
    public void whenPersonalCodeIsUnknown_thenErrorResponseIsSent() throws Exception {
        String personalCode = "15487128591";
        BigDecimal loanAmount = new BigDecimal("3500");
        int loanPeriod = 24;
        ErrorResponse errorResponse = performLoanRequest(API_ENDPOINT, personalCode, loanAmount, loanPeriod);

        assertEquals("Unknown personal code", errorResponse.getMessages().getFirst());
        assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.getStatus());
    }

    @Test
    public void whenGenericExceptionIsThrown_thenErrorResponseIsSent() throws Exception {
        String incorrectEndpoint = "/loan";
        String personalCode = "15487128591";
        BigDecimal loanAmount = new BigDecimal("3500");
        int loanPeriod = 24;
        ErrorResponse errorResponse = performLoanRequest(incorrectEndpoint, personalCode, loanAmount, loanPeriod);

        assertEquals("An unexpected error occurred", errorResponse.getMessages().getFirst());
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorResponse.getStatus());
    }

    private ErrorResponse performLoanRequest(String url, String personalCode, BigDecimal loanAmount, int loanPeriod) throws Exception {
        LoanRequest loanRequest = new LoanRequest(personalCode, loanAmount, loanPeriod);

        String requestJson = objectMapper.writeValueAsString(loanRequest);

        MvcResult mvcResult = mockMvc.perform(post(url)
                        .contentType("application/json")
                        .content(requestJson))
                .andReturn();

        return objectMapper.readValue(mvcResult.getResponse().getContentAsString(), ErrorResponse.class);
    }
}
