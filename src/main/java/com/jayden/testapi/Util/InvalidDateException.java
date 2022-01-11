package com.jayden.testapi.Util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class InvalidDateException extends RuntimeException{
    public InvalidDateException(String reason) {
        super(reason);
    }
}
