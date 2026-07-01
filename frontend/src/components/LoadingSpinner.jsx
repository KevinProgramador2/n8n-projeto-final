export default function LoadingSpinner() {
  return (
    <div className="loading" role="status" aria-live="polite" aria-label="A IA esta analisando seu pedido">
      <div className="spinner" aria-hidden="true"></div>
      <p>A IA esta analisando seu pedido...</p>
      <p className="loading-sub">Isso pode levar alguns segundos.</p>
    </div>
  );
}