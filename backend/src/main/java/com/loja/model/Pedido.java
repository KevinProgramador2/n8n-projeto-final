package com.loja.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cliente;

    private String cidade;

    private BigDecimal valorTotal;

    @ElementCollection
    @CollectionTable(name = "pedido_produtos", joinColumns = @JoinColumn(name = "pedido_id"))
    @Column(name = "produto")
    private List<String> produtos;

    private String perfilCliente;

    private String recomendacoes;

    private String cupomDesconto;

    private String mensagemIA;

    @Column(length = 20)
    private String statusAnalise;

    private LocalDateTime criadoEm;

    private LocalDateTime atualizadoEm;

    @PrePersist
    protected void onCreate() {
        criadoEm = LocalDateTime.now();
        atualizadoEm = LocalDateTime.now();
        statusAnalise = "AGUARDANDO_IA";
    }

    @PreUpdate
    protected void onUpdate() {
        atualizadoEm = LocalDateTime.now();
    }
}