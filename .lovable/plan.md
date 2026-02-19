
## Migrar para Ambiente de Teste do Stripe

### Contexto

O ambiente atual está configurado com chave de produção (`sk_live_`) e Price IDs de produção. Para realizar testes com segurança (cartão de teste `4242 4242 4242 4242`, sem cobranças reais), precisamos:

1. Trocar a `STRIPE_SECRET_KEY` pela chave secreta de **teste** (`sk_test_...`)
2. Criar Price IDs de **teste** equivalentes aos produtos existentes
3. Atualizar o banco de dados com os novos Price IDs de teste

---

### O que vai ser feito

#### Passo 1 — Atualizar a chave secreta do Stripe

Você precisará acessar o **Stripe Dashboard → Developers → API Keys** e copiar a **Secret key** no modo **Test** (começa com `sk_test_`). Vou abrir o campo para você colar a chave.

#### Passo 2 — Criar os Price IDs de teste

Com a chave de teste ativa, vou criar via ferramentas do Stripe dois produtos e preços de teste equivalentes:

| E-book | Preço atual |
|---|---|
| 30 Dias - Quebrando Cadeias Espirituais | R$ 19,90 |
| 8 Habilidades | R$ 19,90 |

Os outros dois e-books (`Defesa Nacional` e `Aviação Militar Brasileira`) ainda não têm Stripe configurado — posso incluí-los também se quiser.

#### Passo 3 — Atualizar o banco de dados

Após criar os preços de teste, atualizo os registros dos dois e-books no banco com os novos `stripe_price_id` de teste.

#### Passo 4 — Validar o fluxo completo

Com tudo configurado, você poderá testar usando:
- **Cartão de teste:** `4242 4242 4242 4242`
- **Validade:** qualquer data futura
- **CVV:** qualquer 3 dígitos

Nenhuma cobrança real será feita.

---

### Resumo Técnico

- **Secret atualizado:** via `secrets` (STRIPE_SECRET_KEY)
- **Edge Function `create-payment`:** sem alteração de código — apenas a chave muda
- **Banco de dados:** UPDATE nos campos `stripe_price_id` dos dois e-books
- **Reversão para produção:** basta repetir o processo com a chave live e os Price IDs de produção originais (`price_1T2dxh...` e `price_1T2dwR...`)
