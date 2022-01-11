package com.jayden.testapi.Util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class SessionTypesException extends RuntimeException {
    public SessionTypesException(String exception) {
        super(exception);
    }
}
