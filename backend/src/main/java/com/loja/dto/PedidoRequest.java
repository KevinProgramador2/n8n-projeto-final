package com.loja.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoRequest {

    @NotBlank(message = "Cliente e obrigatorio")
    private String cliente;

    @NotBlank(message = "Cidade e obrigatoria")
    private String cidade;

    @NotNull(message = "Valor total e obrigatorio")
    private BigDecimal valorTotal;

    @NotNull(message = "Produtos sao obrigatorios")
    private List<String> produtos;
}