package com.loan.decision.engine.util;

import com.loan.decision.engine.exception.UnknownPersonalCodeException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PersonalCodeUtils {

    private static final Map<String, Integer> personalCodeSegment = Map.of(
            "49002010965", 0,
            "49002010976", 100,
            "49002010987", 300,
            "49002010998", 1000
    );

    public static int getCreditModifier(String personalCode) {
        if (!personalCodeSegment.containsKey(personalCode)) {
            throw new UnknownPersonalCodeException();
        }
        return personalCodeSegment.get(personalCode);
    }

}
