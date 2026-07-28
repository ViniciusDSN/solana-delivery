"use client";

import { Star, Clock } from "lucide-react";
import type { Motoboy } from "@/lib/motoboys";
import { shortenAddress } from "@/lib/solana-config";

const VEHICLE_EMOJI: Record<string, string> = {
  "Moto 160cc": "🏍️",
  "Scooter elétrica": "🛵",
  "Moto esportiva": "🏎️",
  "Moto com baú": "📦",
};

export function MotoboyPicker({
  motoboys,
  selectedId,
  onSelect,
}: {
  motoboys: Motoboy[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {motoboys.map((m) => {
        const selected = m.id === selectedId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
              selected
                ? "border-transparent bg-surface-2 shadow-[0_0_0_1.5px_var(--ring)]"
                : "border-line bg-surface hover:border-foreground/20"
            }`}
            style={selected ? ({ "--ring": m.color } as React.CSSProperties) : undefined}
          >
            <span
              className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
              style={{ background: m.color }}
            />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
                  style={{ background: `${m.color}22` }}
                >
                  {VEHICLE_EMOJI[m.vehicle] ?? "🏍️"}
                </span>
                <div>
                  <p className="text-sm font-semibold">{m.name}</p>
                  <p className="text-xs text-foreground/50">{m.vehicle}</p>
                </div>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ background: `${m.color}22`, color: m.color }}
              >
                {m.tag}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-foreground/60">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow text-yellow" />
                {m.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />~{m.etaMin} min
              </span>
              <span className="font-mono">{shortenAddress(m.publicKey)}</span>
            </div>

            <div className="mt-3 flex items-baseline gap-1 border-t border-line pt-3">
              <span className="font-mono text-base font-semibold">{m.priceSol}</span>
              <span className="text-xs text-foreground/50">SOL nesta corrida</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
