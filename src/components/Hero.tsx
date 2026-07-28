import { RouteAnimation } from "./RouteAnimation";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-14 pb-6 sm:pt-20">
      <div className="grid items-center gap-10 sm:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-foreground/60">
            Superteam Brasil × TDC Floripa 2026
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Chame um motoboy.
            <br />
            <span className="text-gradient">Pague em Solana.</span>
            <br />
            Chega em segundos.
          </h1>
          <p className="mt-4 max-w-md text-sm text-foreground/60 sm:text-base">
            A empresa A dispara a corrida, assina uma transação e o motoboy B recebe o
            pagamento direto na carteira — confirmado na devnet da Solana, sem
            intermediário financeiro.
          </p>
        </div>
        <RouteAnimation />
      </div>
    </section>
  );
}
