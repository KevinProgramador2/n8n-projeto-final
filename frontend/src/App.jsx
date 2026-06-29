import { useState, useEffect, useCallback } from 'react';
import FormularioPedido from './components/FormularioPedido';
import ResultadoAnalise from './components/ResultadoAnalise';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [pedido, setPedido] = useState(null);
  const [analise, setAnalise] = useState(null);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const verificarAnalise = useCallback(async (pedidoId) => {
    try {
      const response = await fetch(`http://localhost:8080/pedidos/${pedidoId}`);
      if (!response.ok) throw new Error('Erro ao buscar pedido.');

      const data = await response.json();
      if (data.analise) {
        setAnalise(data.analise);
        setEstaCarregando(false);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!pedido || analise) return;

    setEstaCarregando(true);
    let tentativas = 0;
    const maxTentativas = 30;

    const intervalo = setInterval(async () => {
      tentativas++;
      const pronta = await verificarAnalise(pedido.id);

      if (pronta || tentativas >= maxTentativas) {
        clearInterval(intervalo);
        if (!pronta) {
          setErro('A analise esta demorando. Verifique o n8n e tente novamente.');
          setEstaCarregando(false);
        }
      }
    }, 2000);

    return () => clearInterval(intervalo);
  }, [pedido, analise, verificarAnalise]);

  const handlePedidoCriado = (novoPedido) => {
    setPedido(novoPedido);
    setAnalise(null);
    setErro('');
  };

  const handleNovoPedido = () => {
    setPedido(null);
    setAnalise(null);
    setErro('');
  };

  return (
    <div className="app">
      <header>
        <h1>TechStore - Loja Virtual</h1>
        <p className="subtitulo">Com tecnologia e inteligencia artificial</p>
      </header>

      <main>
        {!pedido && (
          <FormularioPedido
            onPedidoCriado={handlePedidoCriado}
            estaCarregando={estaCarregando}
          />
        )}

        {pedido && !analise && !erro && <LoadingSpinner />}

        {erro && (
          <div role="alert" className="erro-container">
            <p>{erro}</p>
            <button onClick={handleNovoPedido}>Novo Pedido</button>
          </div>
        )}

        {analise && (
          <>
            <div className="pedido-info">
              <h2>Pedido #{pedido.id}</h2>
              <p><strong>Cliente:</strong> {pedido.cliente}</p>
              <p><strong>Cidade:</strong> {pedido.cidade}</p>
              <p><strong>Valor:</strong> R$ {pedido.valorTotal.toFixed(2)}</p>
              <p><strong>Produtos:</strong> {JSON.parse(pedido.produtos).join(', ')}</p>
            </div>
            <ResultadoAnalise analise={analise} />
            <button onClick={handleNovoPedido} className="btn-novo-pedido">
              Fazer Novo Pedido
            </button>
          </>
        )}
      </main>

      <footer>
        <p>Trabalho Final - Integracao Backend com IA via n8n</p>
      </footer>
    </div>
  );
}

export default App;
