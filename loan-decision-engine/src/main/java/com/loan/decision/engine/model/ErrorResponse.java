package com.loan.decision.engine.model;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ErrorResponse {
    private final List<String> messages;
    private final int status;
    private final LocalDateTime timestamp;

    public ErrorResponse(List<String> messages, int status) {
        this.messages = messages;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }
}
