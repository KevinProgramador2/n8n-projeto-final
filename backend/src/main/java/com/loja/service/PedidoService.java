package com.loja.service;

import com.loja.dto.AnaliseRequest;
import com.loja.dto.PedidoRequest;
import com.loja.exception.ResourceNotFoundException;
import com.loja.model.Pedido;
import com.loja.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${n8n.webhook.url}")
    private String n8nWebhookUrl;

    public Pedido criarPedido(PedidoRequest request) {
        Pedido pedido = Pedido.builder()
                .cliente(request.getCliente())
                .cidade(request.getCidade())
                .valorTotal(request.getValorTotal())
                .produtos(request.getProdutos())
                .build();

        Pedido salvo = pedidoRepository.save(pedido);
        log.info("Pedido {} salvo com sucesso", salvo.getId());

        enviarParaWebhook(salvo);

        return salvo;
    }

    private void enviarParaWebhook(Pedido pedido) {
        Map<String, Object> body = Map.of(
                "id", pedido.getId(),
                "cliente", pedido.getCliente(),
                "cidade", pedido.getCidade(),
                "valorTotal", pedido.getValorTotal(),
                "produtos", pedido.getProdutos());

        webClientBuilder.build()
                .post()
                .uri(n8nWebhookUrl)
                .bodyValue(body)
                .retrieve()
                .toBodilessEntity()
                .doOnSuccess(response -> log.info("Pedido {} enviado para n8n. Status: {}", pedido.getId(),
                        response.getStatusCode().value()))
                .doOnError(
                        error -> log.error("Erro ao enviar pedido {} para n8n: {}", pedido.getId(), error.getMessage()))
                .subscribe();
    }

    public Pedido receberAnalise(Long pedidoId, AnaliseRequest request) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido nao encontrado: " + pedidoId));

        pedido.setPerfilCliente(request.getPerfilCliente());
        pedido.setRecomendacoes(request.getRecomendacoes());
        pedido.setCupomDesconto(request.getCupomDesconto());
        pedido.setMensagemIA(request.getMensagemIA());
        pedido.setStatusAnalise("CONCLUIDO");

        Pedido atualizado = pedidoRepository.save(pedido);
        log.info("Analise recebida para pedido {}", pedidoId);

        return atualizado;
    }

    public Pedido buscarPedido(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido nao encontrado: " + id));
    }
}