package com.safehouse.safehouse.domain.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginDTO {

    @NotBlank(message = "Token is required")
    private String token;
    @NotBlank(message = "Id is required")
    private String role;
}
