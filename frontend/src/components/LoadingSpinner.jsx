export default function LoadingSpinner() {
  return (
    <div className="loading" role="status" aria-label="Carregando analise da IA">
      <div className="spinner"></div>
      <p>A IA esta analisando seu pedido...</p>
      <p className="loading-sub">Isso pode levar alguns segundos.</p>
    </div>
  );
}
