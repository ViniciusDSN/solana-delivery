export const DEVNET_ENDPOINT =
  process.env.NEXT_PUBLIC_RPC_ENDPOINT ??
  "https://polished-dry-forest.solana-devnet.quiknode.pro/c5943463eb6799a039aee8340e2028f80bcc570d/";

export const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";

export function explorerTxUrl(signature: string) {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}

export function explorerAddressUrl(address: string) {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

export function shortenAddress(address: string, chars = 4) {
  if (!address) return "";
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}
