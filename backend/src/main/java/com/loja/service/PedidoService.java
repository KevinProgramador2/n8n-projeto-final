package com.loja.service;

import com.loja.dto.AnaliseRequest;
import com.loja.dto.PedidoRequest;
import com.loja.model.AnalisePedido;
import com.loja.model.Pedido;
import com.loja.repository.PedidoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ObjectMapper objectMapper;

    @Value("${n8n.webhook.url}")
    private String n8nWebhookUrl;

    public Pedido criarPedido(PedidoRequest request) {
        Pedido pedido = Pedido.builder()
                .cliente(request.getCliente())
                .cidade(request.getCidade())
                .valorTotal(request.getValorTotal())
                .produtos(objectMapper.valueToTree(request.getProdutos()).toString())
                .build();

        Pedido salvo = pedidoRepository.save(pedido);
        log.info("Pedido {} salvo com sucesso", salvo.getId());

        enviarParaWebhook(salvo);

        return salvo;
    }

    private void enviarParaWebhook(Pedido pedido) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            List<String> produtosLista = objectMapper.readValue(
                    pedido.getProdutos(),
                    objectMapper.getTypeFactory().constructCollectionType(List.class, String.class)
            );

            Map<String, Object> body = Map.of(
                    "id", pedido.getId(),
                    "cliente", pedido.getCliente(),
                    "cidade", pedido.getCidade(),
                    "valorTotal", pedido.getValorTotal(),
                    "produtos", produtosLista
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    n8nWebhookUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            log.info("Pedido {} enviado para n8n. Status: {}", pedido.getId(), response.getStatusCode());

        } catch (Exception e) {
            log.error("Erro ao enviar pedido {} para n8n: {}", pedido.getId(), e.getMessage());
        }
    }

    public Pedido receberAnalise(Long pedidoId, AnaliseRequest request) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido nao encontrado: " + pedidoId));

        AnalisePedido analise = AnalisePedido.builder()
                .perfilCliente(request.getPerfilCliente())
                .recomendacoes(request.getRecomendacoes())
                .cupomDesconto(request.getCupomDesconto())
                .mensagemIA(request.getMensagemIA())
                .build();

        pedido.setAnalise(analise);

        Pedido atualizado = pedidoRepository.save(pedido);
        log.info("Analise recebida para pedido {}", pedidoId);

        return atualizado;
    }

    public Pedido buscarPedido(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido nao encontrado: " + id));
    }
}
