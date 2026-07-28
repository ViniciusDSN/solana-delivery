"use client";

import dynamic from "next/dynamic";
import { Zap } from "lucide-react";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false },
);

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-orange via-purple to-green">
            <Zap className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">ZUM</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
              motoboy on-chain
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-mono text-green sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
            devnet
          </span>
          <WalletMultiButton style={walletButtonStyle} />
        </div>
      </div>
    </header>
  );
}

const walletButtonStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #ff6a3d, #9945ff)",
  borderRadius: "0.75rem",
  height: "40px",
  fontSize: "14px",
  fontFamily: "var(--font-display)",
};
