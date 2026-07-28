export type OrderStage = "pago" | "a_caminho" | "retirado" | "entregue";

export type HistoryEntry = {
  id: string;
  pickup: string;
  dropoff: string;
  note: string;
  motoboyId: string;
  motoboyName: string;
  motoboyPublicKey: string;
  priceSol: number;
  signature: string;
  createdAt: number;
  stage: OrderStage;
};

export const STAGE_LABEL: Record<OrderStage, string> = {
  pago: "Pagamento confirmado on-chain",
  a_caminho: "Motoboy a caminho da coleta",
  retirado: "Pacote retirado",
  entregue: "Entregue",
};
