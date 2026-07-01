package com.loja.controller;

import com.loja.dto.AnaliseRequest;
import com.loja.dto.PedidoRequest;
import com.loja.model.Pedido;
import com.loja.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@Valid @RequestBody PedidoRequest request) {
        Pedido pedido = pedidoService.criarPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }

    @PutMapping("/{id}/analise")
    public ResponseEntity<Pedido> receberAnalise(
            @PathVariable Long id,
            @Valid @RequestBody AnaliseRequest request) {
        Pedido pedido = pedidoService.receberAnalise(id, request);
        return ResponseEntity.ok(pedido);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedido(@PathVariable Long id) {
        Pedido pedido = pedidoService.buscarPedido(id);
        return ResponseEntity.ok(pedido);
    }
}