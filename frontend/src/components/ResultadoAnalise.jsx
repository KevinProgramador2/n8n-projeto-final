export default function ResultadoAnalise({ analise }) {
  if (!analise) return null;

  return (
    <section
      className="resultado-analise"
      aria-label="Resultado da analise da IA"
      aria-live="polite"
    >
      <h2>Analise da IA</h2>

      <div className="card">
        <div className="card-campo">
          <h3>Perfil do Cliente</h3>
          <p className="perfil">{analise.perfilCliente}</p>
        </div>

        <div className="card-campo">
          <h3>Produtos Recomendados</h3>
          <ul className="recomendacoes">
            {analise.recomendacoes.split(',').map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="card-campo cupom">
          <h3>Seu Cupom de Desconto</h3>
          <span className="codigo-cupom">{analise.cupomDesconto}</span>
        </div>

        <div className="card-campo">
          <h3>Mensagem da IA</h3>
          <p className="mensagem">{analise.mensagemIA}</p>
        </div>
      </div>
    </section>
  );
}
