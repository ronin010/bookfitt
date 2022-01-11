package com.jayden.testapi.Util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class IncrorrectPasswordException extends RuntimeException {
    public IncrorrectPasswordException(String exception) {
        super(exception);
    }
}
