package com.jayden.testapi.Util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class NoTrainerPresentException extends RuntimeException {
    public NoTrainerPresentException(String exception) {
        super(exception);
    }
}
