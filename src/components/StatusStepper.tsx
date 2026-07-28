"use client";

import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import type { OrderStage } from "@/lib/history";

const STAGES: { key: OrderStage; label: string }[] = [
  { key: "pago", label: "Pagamento confirmado on-chain" },
  { key: "a_caminho", label: "Motoboy a caminho da coleta" },
  { key: "retirado", label: "Pacote retirado" },
  { key: "entregue", label: "Entregue" },
];

export function StatusStepper({ stage }: { stage: OrderStage }) {
  const currentIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <ol className="space-y-0">
      {STAGES.map((s, i) => {
        const done = i < currentIndex || (i === currentIndex && s.key === "entregue");
        const active = i === currentIndex && s.key !== "entregue";
        const upcoming = i > currentIndex;

        return (
          <li key={s.key} className="relative flex gap-3 pb-6 last:pb-0">
            {i < STAGES.length - 1 && (
              <span
                className="absolute left-[11px] top-6 h-full w-px"
                style={{
                  background: done || active ? "var(--green)" : "var(--line)",
                  opacity: done ? 0.6 : 0.3,
                }}
              />
            )}
            <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-green" />
              ) : active ? (
                <Loader2 className="h-5 w-5 animate-spin text-orange" />
              ) : (
                <CircleDashed className="h-5 w-5 text-foreground/25" />
              )}
            </span>
            <span
              className={`text-sm ${
                upcoming ? "text-foreground/35" : active ? "text-orange" : "text-foreground/90"
              }`}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
