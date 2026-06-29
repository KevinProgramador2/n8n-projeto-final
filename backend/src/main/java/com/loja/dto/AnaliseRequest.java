package com.loja.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnaliseRequest {

    @NotBlank(message = "Perfil do cliente e obrigatorio")
    private String perfilCliente;

    @NotBlank(message = "Recomendacoes sao obrigatorias")
    private String recomendacoes;

    @NotBlank(message = "Cupom de desconto e obrigatorio")
    private String cupomDesconto;

    @NotBlank(message = "Mensagem da IA e obrigatoria")
    private String mensagemIA;
}
