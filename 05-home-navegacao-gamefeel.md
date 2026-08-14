# 05 · Home, Navegação Inferior e Game-Feel

## 1. Bottom nav — spec

```
┌─────────────────────────────────────────────┐
│                                             │
│   🏠        📍       ╭────╮      🏆     🛍   │
│  Início  Explorar   │ 🎾 │    Ligas   Loja  │
│                     ╰────╯                  │
│                     JOGAR                   │
└─────────────────────────────────────────────┘
```

| Propriedade | Valor |
|---|---|
| Altura | 64pt + safe area; sempre visível nas 5 tabs (some em fluxos modais: timer de sessão, checkout) |
| FAB **Jogar** | 56pt, circular, **lime `#99cc00`**, ícone bolinha `#0b120c`, elevado 12pt acima da barra; press = squash-and-stretch (escala 0.92 → overshoot 1.04) |
| Item ativo | ícone preenchido + label bold + pílula de fundo `card` (mesma linguagem do sidebar do admin) |
| Item inativo | ícone outline, `muted-foreground`, 40% |
| Badges | contadores contextuais: Ligas (posição em risco no domingo), Loja (cupom novo), Início (placar a confirmar) |
| Toque | transição de tab com float-in 250ms `cubic-bezier(.625,.05,0,1)`; haptic leve |
| Sheet do FAB | 4 ações grandes (Registrar sessão · Registrar partida · Abrir match · Reservar quadra), abre com spring, uma mão alcança tudo |

**Perfil** = avatar com anel de progresso de nível, fixo no header de todas as tabs (não gasta slot da barra).

## 2. Home — spec bloco a bloco

Pedido explícito: a home mostra claramente **ranking**, **últimos jogos** e **insights**.

```
┌──────────────────────────────────────┐
│ (avatar◔nível)  🔥12   ⚪480    🔔   │  ← header fixo
├──────────────────────────────────────┤
│ ▸ COMPROMISSO (condicional)          │  ← "Confirmar placar vs. Ana" /
│                                      │     "Hoje 19h · Quadra 2, Clube X"
├──────────────────────────────────────┤
│ SUA LIGA · Divisão Ouro              │
│ 4º de 30  ·  ▲2 esta semana         │  ← RANKING
│ ┌ 1. Rafa 940 ┊ 3. Bia 720 ┊ ● Você │
│ termina em 2d 14h   [ver liga →]     │
├──────────────────────────────────────┤
│ ÚLTIMOS JOGOS                        │
│ ● V 6-4 6-3 vs Pedro   +120XP ▲0.1  │  ← ÚLTIMOS JOGOS
│ ● Treino saque 45min    +80XP       │
│ ● D 4-6 3-6 vs Carla   +120XP ▼0.05│
│                    [histórico →]     │
├──────────────────────────────────────┤
│ INSIGHTS  ◂ ▸                        │
│ "Você venceu 3 seguidas contra       │  ← INSIGHTS (carrossel)
│  ratings acima do seu — tendência    │
│  de subida 📈"                       │
├──────────────────────────────────────┤
│ MISSÕES DA SEMANA   ▓▓▓░ 2/3        │
│ TRILHA: Saque · Estágio 3  ▓▓░░░    │
├──────────────────────────────────────┤
│  🏠    📍    (🎾)    🏆    🛍        │
└──────────────────────────────────────┘
```

### Regras do bloco Ranking (Sua Liga)
- Sempre mostra: divisão, posição/30, variação da semana, contagem regressiva para segunda.
- Mini-tabela: top 3 + a "vizinhança" da sua posição (quem está logo acima/abaixo — a comparação que motiva).
- Estados: zona de promoção (top 10) = verde lima; zona de queda (últimos 5) = alerta; sem atividade na semana = card vira CTA "1 sessão te coloca no jogo".

### Regras do bloco Últimos Jogos
- 3 itens mais recentes misturando partidas e sessões; cada linha: tipo/adversário, resultado, XP ganho, ΔRating (só partidas validadas).
- Vitória/derrota com cor semântica discreta; placar a validar aparece com selo "aguardando adversário".

### Insights — regras de geração (motor de cards)

Cards gerados por regras sobre os dados do jogador (sem ML no MVP), 1–3 por dia, priorizados por relevância:

| Categoria | Exemplo de card | Gatilho |
|---|---|---|
| Constância | "3 sessões esta semana — 20% acima da sua média" | comparação com média móvel 4 semanas |
| Tendência de rating | "3 vitórias seguidas contra ratings maiores — tendência de subida 📈" | sequência de resultados vs. rating |
| Trilha | "Seu saque avançou 2 estágios este mês" | progresso de trilha |
| Liga | "Faltam 40 PL para o top 10 — 1 partida validada resolve" | distância para promoção |
| Social | "Seu clube subiu para 2º no ranking entre clubes" | movimento de clube |
| Hábito | "Quinta 18h costuma ter quadra livre no Clube X" | padrão de agenda + inventário |
| Streak em risco | "Sua sequência de 12 dias termina hoje à noite" | streak sem atividade no dia |

Cada insight termina em **1 ação** ("marcar quadra", "abrir match", "registrar sessão") — insight sem botão é estatística, não produto.

## 3. Game-feel — princípios (tem que ter cara de jogo)

Herda o DS **ON COURT** (Archivo 700, lime `#99cc00` / acid `#ccff33`, ink `#0b120c`, radius 0/pill, easing assinatura `cubic-bezier(.625,.05,0,1)`) e adiciona a camada de *juice*:

1. **Toda recompensa é uma cena, não um toast.** Fim de sessão = tela própria: XP conta de 0 ao valor (rolagem numérica), barra de nível enche com overshoot, Bolinhas caem com física, badge entra com pixel-reveal. 1,5–2,5s, skippable.
2. **Recompensa variável visível**: o "crítico do dia" tem som/haptic próprio e brilho acid — o jogador aprende a esperar surpresa.
3. **Números nunca simplesmente mudam** — rolam (odometer). Posições de ranking trocam com reorder animado da lista.
4. **Streak com identidade**: chama 🔥 cresce com o tamanho da sequência; em risco, pulsa discretamente no header.
5. **Haptics semânticos**: leve = registro; médio = subir de posição; sucesso = level-up/badge; nunca em erro de rede.
6. **Level-up e virada de faixa** = momento-herói: modal fullscreen com a bola da faixa (vermelha→lendária), char-stagger no título, confete nas cores do DS, botão de compartilhar cartão.
7. **Sons opt-out** (pop de ponto, "toque" de bola no crítico), desligáveis nas configurações; respeitar modo silencioso.
8. **Empty states jogáveis**: todo vazio aponta a próxima jogada do loop, com a bonequinha ilustrada do universo visual da marca (mesma linguagem do hero da LP).
9. **Perda com dignidade**: derrota e rebaixamento nunca usam vermelho-punição nem animação de fracasso — mostram o caminho de volta ("2 vitórias te devolvem à Ouro").
10. **Performance é game-feel**: tudo a 60fps, animações canceláveis, `prefers-reduced-motion` respeitado.

## 4. Notificações — tom de jogo (gatilhos do loop)

| Gatilho | Exemplo de copy |
|---|---|
| Streak em risco | "🔥 12 dias em jogo. Uma sessão de 30min mantém a chama." |
| Liga (domingo) | "Você está a 40 PL do top 10 — a semana fecha hoje." |
| Placar pendente | "Pedro registrou 6-4 6-3. Confirma?" |
| Match compatível | "Racha aberto a 2km, nível 3.0–4.0, sábado 9h. Topa?" |
| Desafio do mês | "Faltam 400 bolas para a medalha do Desafio Saibro." |

Regra: máx. 1 push de engajamento/dia; pushes transacionais (placar, match, reserva) sempre passam.
