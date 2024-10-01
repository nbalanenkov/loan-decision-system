package com.loan.decision.engine.controller;

import com.loan.decision.engine.model.LoanResponse;
import com.loan.decision.engine.model.LoanRequest;
import com.loan.decision.engine.service.LoanDecisionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoanDecisionController {

    private final LoanDecisionService loanDecisionService;

    @PostMapping("/loan-decision")
    public ResponseEntity<LoanResponse> getLoanDecision(@Valid @RequestBody LoanRequest request) {
        return ResponseEntity.ok(loanDecisionService.makeLoanDecision(request));
    }

}
