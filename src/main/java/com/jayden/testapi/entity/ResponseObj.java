package com.jayden.testapi.entity;


import org.springframework.http.HttpStatus;

public class ResponseObj {
    private Object object;
    private HttpStatus status;
    private String token;

    public ResponseObj(Object object, HttpStatus status, String token) {
      
        this.object = object;
        this.status = status;
        this.token = token;
    }

   public ResponseObj() {}

    public Object getObject() {
        return this.object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

        public HttpStatus getStatus() {
            return status;
        }

        public void setStatus(HttpStatus status) {
            this.status = status;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
}