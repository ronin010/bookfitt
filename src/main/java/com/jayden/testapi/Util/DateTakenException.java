package com.jayden.testapi.Util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DateTakenException extends RuntimeException {
    public DateTakenException(String exception) {
        super(exception);
    }
}
