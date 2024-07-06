package com.safehouse.safehouse.domain.dtos;

import com.safehouse.safehouse.domain.models.Token;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenDto {

    private String token;

    public TokenDto(Token token) {
        this.token = token.getContent();
    }
}
