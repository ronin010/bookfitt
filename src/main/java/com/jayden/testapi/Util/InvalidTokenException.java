package com.jayden.testapi.Util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "No Token Present")
public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String exception) {
        super(exception);
    }
}
