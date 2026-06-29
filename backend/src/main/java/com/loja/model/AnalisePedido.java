package com.loja.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "analises")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalisePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String perfilCliente;

    @Column(columnDefinition = "TEXT")
    private String recomendacoes;

    private String cupomDesconto;

    @Column(columnDefinition = "TEXT")
    private String mensagemIA;
}
