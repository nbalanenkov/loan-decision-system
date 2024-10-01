package com.loan.decision.engine.util;

import com.loan.decision.engine.exception.UnknownPersonalCodeException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class PersonalCodeUtilsTest {

    @ParameterizedTest
    @CsvSource({
            "49002010965, 0",
            "49002010976, 100",
            "49002010987, 300",
            "49002010998, 1000"
    })
    public void whenPersonalCodeIsPresent_shouldReturnCorrespondingCreditModifier(String personalCode, int expectedCreditModifier) {
        int actualCreditModifier = PersonalCodeUtils.getCreditModifier(personalCode);

        assertEquals(expectedCreditModifier, actualCreditModifier);
    }

    @Test
    public void whenPersonalCodeIsNotPresent_shouldThrowUnknownPersonalCodeException() {
        assertThrows(UnknownPersonalCodeException.class, () -> PersonalCodeUtils.getCreditModifier("0"));
    }
}
