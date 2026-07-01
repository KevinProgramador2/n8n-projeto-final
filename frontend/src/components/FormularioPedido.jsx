import { useState } from 'react';
import axios from 'axios';

export default function FormularioPedido({ onPedidoCriado, estaCarregando }) {
  const [cliente, setCliente] = useState('');
  const [cidade, setCidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [produtos, setProdutos] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const produtosLista = produtos.split(',').map(p => p.trim()).filter(p => p !== '');
    if (produtosLista.length === 0) {
      setErro('Adicione pelo menos um produto.');
      return;
    }

    const valor = parseFloat(valorTotal);
    if (isNaN(valor) || valor <= 0) {
      setErro('Informe um valor total valido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/pedidos', {
        cliente,
        cidade,
        valorTotal: valor,
        produtos: produtosLista,
      });

      const pedido = response.data;
      onPedidoCriado(pedido);

      setCliente('');
      setCidade('');
      setValorTotal('');
      setProdutos('');
    } catch (err) {
      setErro('Falha ao enviar pedido. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de pedido">
      <fieldset disabled={estaCarregando}>
        <legend>Dados do Pedido</legend>

        <div className="campo">
          <label htmlFor="cliente">Nome do Cliente *</label>
          <input
            id="cliente"
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
            aria-required="true"
            placeholder="Ex: Kevin"
          />
        </div>

        <div className="campo">
          <label htmlFor="cidade">Cidade *</label>
          <input
            id="cidade"
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
            aria-required="true"
            placeholder="Ex: Sao Paulo"
          />
        </div>

        <div className="campo">
          <label htmlFor="valorTotal">Valor Total (R$) *</label>
          <input
            id="valorTotal"
            type="number"
            step="0.01"
            min="0.01"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
            required
            aria-required="true"
            placeholder="Ex: 2500.00"
          />
        </div>

        <div className="campo">
          <label htmlFor="produtos">Produtos * (separados por vírgula)</label>
          <input
            id="produtos"
            type="text"
            value={produtos}
            onChange={(e) => setProdutos(e.target.value)}
            required
            aria-required="true"
            placeholder="Ex: Notebook, Mouse, Teclado"
          />
        </div>

        {erro && (
          <div role="alert" className="erro">
            {erro}
          </div>
        )}

        <button type="submit" className="btn-enviar" disabled={estaCarregando}>
          {estaCarregando ? 'Enviando...' : 'Finalizar Pedido'}
        </button>
      </fieldset>
    </form>
  );
}