import { Keypair } from "@solana/web3.js";
import { writeFileSync } from "fs";

const names = ["Carlos Relampago", "Bia Fireball", "Duda Turbo", "Zeca Cargo"];
const out = names.map((name) => {
  const kp = Keypair.generate();
  return {
    name,
    publicKey: kp.publicKey.toBase58(),
    secretKey: Array.from(kp.secretKey),
  };
});

writeFileSync("scripts/motoboys-devnet-keypairs.json", JSON.stringify(out, null, 2));
console.log(out.map(({ name, publicKey }) => `${name}: ${publicKey}`).join("\n"));
