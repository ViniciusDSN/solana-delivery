"use client";

import { useCallback, useEffect, useState } from "react";
import type { HistoryEntry, OrderStage } from "@/lib/history";

const STORAGE_KEY = "zum:orders";

export function useOrderHistory() {
  const [orders, setOrders] = useState<HistoryEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Lido só depois do mount (localStorage não existe no server) — por isso
    // o carregamento inicial acontece aqui e não num useState lazy initializer.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      // localStorage indisponível (modo privado, etc). PoC segue sem histórico.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  const addOrder = useCallback((order: HistoryEntry) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateStage = useCallback((id: string, stage: OrderStage) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, stage } : o)));
  }, []);

  return { orders, addOrder, updateStage, hydrated };
}
