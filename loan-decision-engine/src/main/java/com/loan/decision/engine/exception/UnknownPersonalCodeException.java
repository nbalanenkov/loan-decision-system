package com.loan.decision.engine.exception;

public class UnknownPersonalCodeException extends RuntimeException {
    public UnknownPersonalCodeException() {
        super("Unknown personal code");
    }
}
