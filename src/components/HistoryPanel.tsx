"use client";

import { ExternalLink, History } from "lucide-react";
import type { HistoryEntry } from "@/lib/history";
import { STAGE_LABEL } from "@/lib/history";
import { explorerTxUrl, shortenAddress } from "@/lib/solana-config";

const STAGE_COLOR: Record<HistoryEntry["stage"], string> = {
  pago: "var(--orange)",
  a_caminho: "var(--yellow)",
  retirado: "var(--purple)",
  entregue: "var(--green)",
};

export function HistoryPanel({ orders }: { orders: HistoryEntry[] }) {
  if (orders.length === 0) return null;

  return (
    <div className="glass noise rounded-3xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <History className="h-4 w-4 text-foreground/50" />
        <h3 className="text-sm font-semibold text-foreground/80">
          Corridas desta empresa ({orders.length})
        </h3>
      </div>

      <div className="space-y-2">
        {orders.map((o) => (
          <div
            key={o.id}
            className="flex flex-col gap-2 rounded-xl border border-line bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {o.pickup} <span className="text-foreground/40">→</span> {o.dropoff}
              </p>
              <p className="text-xs text-foreground/50">
                {o.motoboyName} · {o.priceSol} SOL ·{" "}
                {new Date(o.createdAt).toLocaleTimeString("pt-BR")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  background: `${STAGE_COLOR[o.stage]}22`,
                  color: STAGE_COLOR[o.stage],
                }}
              >
                {STAGE_LABEL[o.stage]}
              </span>
              <a
                href={explorerTxUrl(o.signature)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground"
                title={o.signature}
              >
                {shortenAddress(o.signature, 5)}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
