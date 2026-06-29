import { useState } from 'react';

export default function FormularioPedido({ onPedidoCriado, estaCarregando }) {
  const [cliente, setCliente] = useState('');
  const [cidade, setCidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [produtos, setProdutos] = useState(['']);
  const [erro, setErro] = useState('');

  const adicionarProduto = () => {
    setProdutos([...produtos, '']);
  };

  const removerProduto = (index) => {
    if (produtos.length > 1) {
      setProdutos(produtos.filter((_, i) => i !== index));
    }
  };

  const atualizarProduto = (index, valor) => {
    const novosProdutos = [...produtos];
    novosProdutos[index] = valor;
    setProdutos(novosProdutos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const produtosFiltrados = produtos.filter(p => p.trim() !== '');
    if (produtosFiltrados.length === 0) {
      setErro('Adicione pelo menos um produto.');
      return;
    }

    const valor = parseFloat(valorTotal);
    if (isNaN(valor) || valor <= 0) {
      setErro('Informe um valor total valido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente,
          cidade,
          valorTotal: valor,
          produtos: produtosFiltrados,
        }),
      });

      if (!response.ok) throw new Error('Erro ao criar pedido.');

      const pedido = await response.json();
      onPedidoCriado(pedido);

      setCliente('');
      setCidade('');
      setValorTotal('');
      setProdutos(['']);
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
          <label>Produtos *</label>
          {produtos.map((produto, index) => (
            <div key={index} className="produto-input">
              <input
                type="text"
                value={produto}
                onChange={(e) => atualizarProduto(index, e.target.value)}
                placeholder={`Produto ${index + 1}`}
                aria-label={`Produto ${index + 1}`}
              />
              {produtos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerProduto(index)}
                  className="btn-remover"
                  aria-label={`Remover produto ${index + 1}`}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={adicionarProduto}
            className="btn-adicionar"
          >
            + Adicionar Produto
          </button>
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
