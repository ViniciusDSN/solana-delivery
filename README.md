# ZUM — motoboy pago em Solana

PoC full-stack construída para o desafio de desenvolvimento em Solana da
**Superteam Brasil** no **TDC Floripa 2026**.

A ideia: a empresa A chama um motoboy e paga a corrida em SOL. O pagamento
sai da carteira da empresa e cai direto na carteira do motoboy B — uma
transferência real na **devnet** da Solana, com os dados da entrega
(retirada, destino, observações) gravados on-chain via uma instrução
**Memo**, na mesma transação.

## Como funciona

1. A empresa conecta a carteira (Phantom/Solflare) em **Devnet**.
2. Preenche a corrida (retirada, entrega, observações) e escolhe um dos
   motoboys disponíveis — cada um com preço fixo em SOL.
3. Ao clicar em **"Chamar motoboy e pagar"**, o app monta uma transação com
   duas instruções:
   - `SystemProgram.transfer` — envia o valor em SOL da empresa para a
     carteira do motoboy;
   - uma instrução para o **Memo Program**
     (`MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`) com um JSON contendo
     origem, destino e observações da corrida.
4. A carteira assina, o app aguarda a confirmação na devnet e mostra o
   status da corrida evoluindo (pago → a caminho → retirado → entregue —
   simulado no front, já que não há um motoboy físico na PoC) com link
   direto para o Solana Explorer.
5. O histórico de corridas fica salvo no `localStorage` do navegador.

Não existe backend: toda a lógica roda no cliente, direto contra a RPC da
devnet. É a integração on-chain que importa para o desafio — o resto
(matching de motoboys, tracking, etc.) é mockado de propósito para manter o
escopo de PoC.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- `@solana/web3.js` + `@solana/wallet-adapter-react` (Phantom/Solflare)
- `framer-motion` / SVG nativo para as animações
- `lucide-react` para ícones

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Por padrão o app usa o RPC de devnet do QuickNode fornecido no workshop. Para
usar outro endpoint (ex: `https://api.devnet.solana.com`), crie um
`.env.local`:

```bash
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
```

### Para testar o pagamento

1. Instale a extensão [Phantom](https://phantom.app) (ou Solflare) e mude a
   rede da carteira para **Devnet** (Configurações → Developer Settings →
   Change Network).
2. Pegue SOL de teste em [faucet.solana.com](https://faucet.solana.com) ou
   no faucet parceiro [pinestake.com](https://www.pinestake.com/en/faucet).
3. Conecte a carteira no app, monte a corrida e confirme o pagamento.
4. O motoboy escolhido é um endereço devnet gerado só para a demo (as chaves
   privadas ficam em `scripts/motoboys-devnet-keypairs.json`, **fora do
   git**, e servem apenas para quem quiser mostrar o saldo do motoboy
   subindo em uma segunda carteira durante a gravação do vídeo).

## Estrutura

```
src/
  app/                 layout + página principal
  components/          UI (header, hero, form, seletor de motoboy, stepper, histórico)
  hooks/useOrderHistory.ts   histórico local (localStorage)
  lib/
    solana-config.ts   endpoint devnet, helpers de explorer
    motoboys.ts         motoboys mock (nome, preço, endereço devnet)
    transaction.ts       monta a transação (transfer + memo)
    history.ts            tipos do histórico de corridas
```

## Deploy

Projeto pronto para Vercel:

```bash
npx vercel
```

Defina `NEXT_PUBLIC_RPC_ENDPOINT` nas env vars do projeto se quiser usar um
RPC próprio.
