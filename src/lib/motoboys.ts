export type Motoboy = {
  id: string;
  name: string;
  vehicle: string;
  publicKey: string;
  priceSol: number;
  etaMin: number;
  rating: number;
  color: string;
  tag: string;
};

// PoC: endereços devnet gerados só para receber os pagamentos de demonstração.
export const MOTOBOYS: Motoboy[] = [
  {
    id: "carlos",
    name: "Carlos “Relâmpago”",
    vehicle: "Moto 160cc",
    publicKey: "8QmwRTmJdzXDMtTJPvteHKCFAonGwL1Sq1jUoo6ySLcg",
    priceSol: 0.04,
    etaMin: 8,
    rating: 4.9,
    color: "#ff6a3d",
    tag: "Mais rápido",
  },
  {
    id: "bia",
    name: "Bia Fireball",
    vehicle: "Scooter elétrica",
    publicKey: "4xG4BUvLPWrGP7R7EtiJVEqNdfzTTGQb8SphmNnmH3XB",
    priceSol: 0.03,
    etaMin: 12,
    rating: 5.0,
    color: "#9945ff",
    tag: "Mais barato",
  },
  {
    id: "duda",
    name: "Duda Turbo",
    vehicle: "Moto esportiva",
    publicKey: "96y2U2KZt9Bimbf7kVG2takU3PEUTiRRCPCtstAjdPaH",
    priceSol: 0.06,
    etaMin: 5,
    rating: 4.8,
    color: "#14f195",
    tag: "Chegada expressa",
  },
  {
    id: "zeca",
    name: "Zeca Cargo",
    vehicle: "Moto com baú",
    publicKey: "HENYAsWoTCVhCKdAHAKuTS3pLfQVYFzpiXJjwqUCaJ2b",
    priceSol: 0.08,
    etaMin: 10,
    rating: 4.7,
    color: "#ffd23f",
    tag: "Carga grande",
  },
];
