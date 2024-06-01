package com.safehouse.safehouse.utils;

import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;

import java.util.*;

@Component
public class ErrorsTool {
    public Map<String, List<String>>mapErrors(List<FieldError> errors){
        Map<String, List<String>> errorsMap = new HashMap<>();
        errors.forEach(
                error ->{
                    List<String> _errors = errorsMap
                            .getOrDefault( error.getField(), new ArrayList<>());
                    _errors.add(error.getDefaultMessage());
                    errorsMap.put(error.getField(), _errors);

                }
        );
        return errorsMap;
    }
}
