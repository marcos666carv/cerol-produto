# CEROL · Guia do facilitador — teste de navegação

**Objetivo:** validar a arquitetura de navegação (bottom nav + FAB), a legibilidade do sistema de pontos e os fluxos críticos — não estética. 5 a 8 pessoas já revelam ~85% dos problemas.

**Formato:** 10–15 min por pessoa, de preferência observando (presencial ou tela compartilhada). Peça para **pensar em voz alta**. Não ajude antes de 30s de silêncio; anote o que a pessoa tentou primeiro.

## O que observar por missão

| # | Missão | Caminho esperado | Sinais de problema |
|---|---|---|---|
| 1 | Conta + atleta | login → nível → **Monte seu atleta** → permissões → home | não entender que os 4 personagens são seleção; procurar "avatar" depois |
| 2 | Posição na liga | home (card de perfil ou tile "Sua Liga") ou tab Ligas | não notar o card de perfil; não achar "faltam 40 PL" |
| 3 | Registrar sessão | FAB 🎾 → Registrar sessão → Encerrar → cena de recompensa | não descobrir o FAB (crítico!); procurar em Início |
| 4 | Registrar partida | FAB 🎾 → Registrar partida → 3 passos (competidor → lugar/quadra/horário → placar) | achar os 3 passos longos; não entender "validação bilateral" |
| 5 | Confirmar placar | sino 🔔 na home (ou banner) → Confirmar | não associar o sino à pendência |
| 6 | Comprar camiseta | Loja → seg **Visual** → card → tamanho G → pagar | não achar a aba Visual; não trocar o tamanho |
| 7 | Reservar quadra | Explorar → quadra → Sex 19:00 → confirmar (ou FAB → Reservar) | confundir Explorar com Ligas |
| 8 | Abrir match | FAB 🎾 → Abrir match → publicar (ou chip Insight na home) | não entender "rating ±0.5" |

## Métricas simples (anote por missão)

- ✅ concluiu sem ajuda / ⚠️ concluiu com hesitação (>15s parado ou 1 caminho errado) / ❌ desistiu ou precisou de ajuda
- Primeiro toque: onde a pessoa clicou primeiro (mostra o modelo mental)
- Frases literais de confusão ("cadê…?", "achei que…")

## Critérios de sucesso do teste

- Missões 1, 3 e 5 (o loop central): ≥80% ✅ sem ajuda
- FAB descoberto até a missão 3 por todos
- Vocabulário (XP · Pontos de Liga · Bolinhas · rating): explicável pela própria pessoa ao final
- Nota média de orientação (pergunta 5) ≥ 8

## Depois do teste

Colete as respostas das 6 perguntas do roteiro. Padrões que aparecerem 2+ vezes viram ajuste no DS/fluxo — me mande a lista que eu aplico nas telas (`produto/design/screens/*` + `prototipo.js`) e regenero o pacote com `python3 produto/design/build.py`.
