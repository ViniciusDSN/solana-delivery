export function Footer() {
  return (
    <footer className="mt-16 border-t border-line/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-xs text-foreground/40 sm:flex-row sm:justify-between sm:text-left">
        <p>
          ZUM — PoC construída no desafio de Solana da Superteam Brasil no TDC Floripa
          2026.
        </p>
        <p>Rodando na devnet · pagamentos reais em SOL de teste.</p>
      </div>
    </footer>
  );
}
