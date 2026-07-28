import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { MEMO_PROGRAM_ID } from "./solana-config";

export type DeliveryOrder = {
  id: string;
  pickup: string;
  dropoff: string;
  note: string;
  motoboyId: string;
  motoboyName: string;
  motoboyPublicKey: string;
  priceSol: number;
};

export function buildDeliveryMemo(order: DeliveryOrder) {
  return JSON.stringify({
    app: "ZUM",
    orderId: order.id,
    pickup: order.pickup,
    dropoff: order.dropoff,
    note: order.note,
    motoboy: order.motoboyName,
  });
}

export function buildDeliveryTransaction({
  payer,
  order,
}: {
  payer: PublicKey;
  order: DeliveryOrder;
}) {
  const tx = new Transaction();
  const motoboyPubkey = new PublicKey(order.motoboyPublicKey);
  const lamports = Math.round(order.priceSol * LAMPORTS_PER_SOL);

  tx.add(
    SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: motoboyPubkey,
      lamports,
    }),
  );

  tx.add(
    new TransactionInstruction({
      keys: [{ pubkey: payer, isSigner: true, isWritable: true }],
      programId: new PublicKey(MEMO_PROGRAM_ID),
      data: Buffer.from(buildDeliveryMemo(order), "utf-8"),
    }),
  );

  return tx;
}
