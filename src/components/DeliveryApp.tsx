"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MapPin,
  Package,
  RotateCcw,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { MOTOBOYS } from "@/lib/motoboys";
import { buildDeliveryTransaction, type DeliveryOrder } from "@/lib/transaction";
import { explorerTxUrl, shortenAddress } from "@/lib/solana-config";
import type { HistoryEntry } from "@/lib/history";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { MotoboyPicker } from "./MotoboyPicker";
import { StatusStepper } from "./StatusStepper";
import { HistoryPanel } from "./HistoryPanel";

type Phase = "form" | "signing" | "confirming" | "success" | "error";

const STAGE_DELAYS: [number, HistoryEntry["stage"]][] = [
  [4000, "a_caminho"],
  [9000, "retirado"],
  [15000, "entregue"],
];

export function DeliveryApp() {
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();
  const { setVisible } = useWalletModal();
  const { orders, addOrder, updateStage } = useOrderHistory();

  const [pickup, setPickup] = useState("Restaurante Sabor & Cia — Centro");
  const [dropoff, setDropoff] = useState("Rua das Palmeiras, 482 — Trindade");
  const [note, setNote] = useState("1 marmita + 1 refrigerante. Tocar interfone 302.");
  const [motoboyId, setMotoboyId] = useState(MOTOBOYS[0].id);

  const [phase, setPhase] = useState<Phase>("form");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const motoboy = useMemo(
    () => MOTOBOYS.find((m) => m.id === motoboyId) ?? MOTOBOYS[0],
    [motoboyId],
  );
  const activeOrder = useMemo(
    () => orders.find((o) => o.id === activeOrderId) ?? null,
    [orders, activeOrderId],
  );

  useEffect(() => {
    const pending = timeouts.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, []);

  const canSubmit = pickup.trim().length > 2 && dropoff.trim().length > 2;

  async function handleCallMotoboy() {
    if (!canSubmit) return;

    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }

    setErrorMessage(null);
    setPhase("signing");

    const order: DeliveryOrder = {
      id: crypto.randomUUID(),
      pickup: pickup.trim(),
      dropoff: dropoff.trim(),
      note: note.trim(),
      motoboyId: motoboy.id,
      motoboyName: motoboy.name,
      motoboyPublicKey: motoboy.publicKey,
      priceSol: motoboy.priceSol,
    };

    try {
      const tx = buildDeliveryTransaction({ payer: publicKey, order });
      const sig = await sendTransaction(tx, connection);

      setPhase("confirming");
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        { signature: sig, ...latestBlockhash },
        "confirmed",
      );

      setActiveOrderId(order.id);
      addOrder({
        id: order.id,
        pickup: order.pickup,
        dropoff: order.dropoff,
        note: order.note,
        motoboyId: order.motoboyId,
        motoboyName: order.motoboyName,
        motoboyPublicKey: order.motoboyPublicKey,
        priceSol: order.priceSol,
        signature: sig,
        createdAt: Date.now(),
        stage: "pago",
      });
      setPhase("success");

      STAGE_DELAYS.forEach(([delay, stage]) => {
        const t = setTimeout(() => updateStage(order.id, stage), delay);
        timeouts.current.push(t);
      });
    } catch (err) {
      setPhase("error");
      setErrorMessage(err instanceof Error ? err.message : "Transação falhou.");
    }
  }

  function handleReset() {
    setPhase("form");
    setActiveOrderId(null);
    setErrorMessage(null);
  }

  return (
    <div className="space-y-6">
      {(phase === "form" || phase === "signing" || phase === "confirming" || phase === "error") && (
        <div className="glass noise rounded-3xl p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange/20 text-xs font-bold text-orange">
              1
            </span>
            <h2 className="text-lg font-semibold">Detalhes da corrida</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Retirada" icon={<MapPin className="h-4 w-4 text-orange" />}>
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Endereço de coleta"
                className="input"
              />
            </Field>
            <Field label="Entrega" icon={<MapPin className="h-4 w-4 text-green" />}>
              <input
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Endereço de destino"
                className="input"
              />
            </Field>
          </div>

          <Field label="Observações" icon={<Package className="h-4 w-4 text-purple" />} className="mt-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="O que vai na entrega?"
              className="input resize-none"
            />
          </Field>

          <div className="mt-6 mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple/20 text-xs font-bold text-purple">
              2
            </span>
            <h2 className="text-lg font-semibold">Escolha o motoboy</h2>
          </div>
          <MotoboyPicker motoboys={MOTOBOYS} selectedId={motoboyId} onSelect={setMotoboyId} />

          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-foreground/50">Total a pagar em Solana</p>
              <p className="font-mono text-2xl font-bold text-gradient">
                {motoboy.priceSol} SOL
              </p>
            </div>
            <button
              type="button"
              disabled={!canSubmit || phase === "signing" || phase === "confirming"}
              onClick={handleCallMotoboy}
              className="group flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange via-purple to-green px-6 py-3.5 text-sm font-semibold text-black transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {phase === "signing" || phase === "confirming" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {phase === "signing" ? "Confirme na sua carteira…" : "Confirmando on-chain…"}
                </>
              ) : !connected ? (
                <>
                  <Wallet className="h-4 w-4" />
                  Conectar carteira para pagar
                </>
              ) : (
                <>
                  Chamar motoboy e pagar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-foreground/40">
            <ShieldCheck className="h-3.5 w-3.5" />
            Transferência SOL + memo com os dados da corrida, gravados on-chain na devnet.
            Verifique se sua carteira está configurada para Devnet.
          </p>

          {phase === "error" && errorMessage && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-orange/30 bg-orange/10 p-3 text-sm text-orange">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}

      {phase === "success" && activeOrder && (
        <div className="glass noise rounded-3xl p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-green" />
            <div>
              <h2 className="text-lg font-semibold">Pagamento enviado on-chain 🎉</h2>
              <p className="text-sm text-foreground/50">
                {activeOrder.motoboyName} recebeu {activeOrder.priceSol} SOL na devnet.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-foreground/40">
                Status da entrega
              </p>
              <StatusStepper stage={activeOrder.stage} />
            </div>

            <div className="space-y-3">
              <SummaryRow label="Rota" value={`${activeOrder.pickup} → ${activeOrder.dropoff}`} />
              <SummaryRow
                label="Motoboy"
                value={`${activeOrder.motoboyName} (${shortenAddress(activeOrder.motoboyPublicKey)})`}
              />
              <SummaryRow label="Valor" value={`${activeOrder.priceSol} SOL`} />
              <a
                href={explorerTxUrl(activeOrder.signature)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground/70 transition-colors hover:border-green/50 hover:text-green"
              >
                <span className="font-mono">{shortenAddress(activeOrder.signature, 6)}</span>
                <span className="flex items-center gap-1 text-xs">
                  Ver no Explorer <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="mt-6 flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Chamar outro motoboy
          </button>
        </div>
      )}

      <HistoryPanel orders={orders.filter((o) => o.id !== activeOrderId)} />
    </div>
  );
}

function Field({
  label,
  icon,
  children,
  className = "",
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/60">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <p className="text-xs text-foreground/40">{label}</p>
      <p className="truncate text-sm font-medium">{value}</p>
    </div>
  );
}
