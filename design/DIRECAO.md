# Direção visual — telas do app CEROL

## Fontes da direção

1. **ON COURT DS** (já construído no projeto): saibro `#c8cbc3`, ink `#0b120c`, lime `#99cc00`, acid `#ccff33`, Archivo 700/800, easing `cubic-bezier(.625,.05,0,1)`, zero sombras.
2. **Pinterest /ds/** (estruturas): bento grids de widgets, stat cards com números gigantes tabulares, charts com personalidade (barras arredondadas, matriz de ticks, gauge de traços, sparkline com ponto final), painéis escuros com dados em lime, diagramas de jornada (pontos + linhas), chips/pills como linguagem de metadado.
3. **Pinterest /tennis-graphics/** (universo do tênis): volt lime como âncora (cor da bola), azul de quadra elétrico, verde-pinheiro escuro para painéis de dados, display condensado caixa-alta gigante, ilustração flat, dados esportivos como gráfica ("220 km/h", "GAME · SET · MATCH").
4. **Skill ui-ux-pro-max** (instalada em `.claude/skills/ui-ux-pro-max/`): checklist pré-entrega — ícones SVG (nunca emoji), estados de foco, contraste 4.5:1, `prefers-reduced-motion`, mobile-first, indicadores de progresso, onboarding pulável.

## Decisões

| Tema | Decisão | Racional |
|---|---|---|
| Paleta | ON COURT + 2 extensões: `--court #2e5ce6` (azul de quadra) e `--pine #12301f` (painel de dados escuro) | As duas cores aparecem consistentemente na pasta tennis-graphics; o pine carrega os charts em lime da pasta ds |
| Raio | Tiles do app com raio 20 (`--r3`) e 12 (`--r2`); botões/chips continuam pill; editorial (LP/admin) continua raio 0 | A linguagem bento/widget das referências é arredondada; o app precisa de cara de jogo, não de documento |
| Números | Sempre `tabular-nums`, tamanho editorial (stat como herói do tile) | Padrão dominante na pasta ds |
| Progresso | Matriz de ticks/bolinhas como linguagem primária (remete à bola), barras arredondadas como secundária | Une o motivo do tênis com o padrão dos charts das referências |
| Ícones | Sprite SVG próprio (stroke 2, 24×24, estilo Lucide) | Checklist da skill: nunca emoji como ícone |
| Dados em destaque | Painel `tile--pine` escuro com valores em lime/acid | Padrão mavence/Grid da pasta tennis-graphics |
| Estrutura | Todos os componentes em `ds.css` com prefixo `c-`; telas montadas SÓ com esses componentes | Marcos vai evoluir gráficos/visões manualmente — 1 lugar para mexer, N telas herdando |

## Vocabulário oficial do produto (usar em PT-BR, exceto estes termos de marca)

**Insight** (bloco da home), **match** (pedido de jogo), **rating** (1.0–7.0), **Finals** (evento presencial da temporada), **streak** só no código — na UI é **Sequência**; *badge* na UI é **emblema**; *push* na UI é **notificação**.

## Motion (seção 19 do ds.css)

Princípios: só `transform`/`opacity` (compositor), 150–320ms, sempre com o easing assinatura `--ease`; `prefers-reduced-motion` zera tudo globalmente (seção 2). Checklist da skill ui-ux-pro-max: feedback de toque <100ms, stagger 30–50ms/item, saída mais rápida que entrada, nada decorativo sem causa-efeito.

| Momento | Mecânica | Onde |
|---|---|---|
| Toque | tudo que é acionável comprime (`scale .96–.985`) em 150ms | automático: chip, opt, row, lrow, tab, slot, seg, persona, swatch, pin, bell, emblem, fab |
| FAB Jogar | anel acid "quica" a cada 3s (`::after`, transform+opacity) | automático em `.c-fab` |
| Sua vez de jogar | nó `hot` da trilha pulsa (`m-hot`) | automático em `.c-path>i.hot` |
| Notificação | dot do sino respira (`m-dot`) | automático em `.c-bell .c-dot` |
| Troca de tela | blocos do `.c-screen` sobem em cascata (40ms/item) | automático no protótipo (`PROTO_CSS`) |
| Progresso | barra preenche da esquerda ao entrar | opt-in: `c-bar` + classe `m-fill` |
| Celebração | medalha/recompensa entra com overshoot | opt-in: `m-burst` |
| Entradas pontuais | `m-rise` (sobe), `m-pop` (escala), `m-stag` (filhos em cascata) | opt-in nos momentos-chave |

Regra: no máximo 1–2 elementos animados de destaque por tela além dos automáticos.

## Tab bar — padrão por tipo de tela

- **Telas de tab**: is-on na tab da área (Início · Explorar · Ligas · Loja).
- **Transversais alcançáveis de várias áreas** (chat do match, suporte, busca a partir de outra tab): tabbar presente, **nenhum is-on**.
- **Subtelas do Perfil e fluxos do FAB** (17x, 18x, 08x, 10x): **sem tabbar** — são stack modal; volta pelo chip do appbar.
- **Momentos modais** (recompensa, share): sem tabbar.

## Arquivos

- `ds.css` — tokens + todos os componentes (fonte única de verdade)
- `icons.svg.html` — sprite de ícones inline (copiar no topo de cada página)
- `components.html` — biblioteca navegável de componentes com nomes e uso
- `screens/*.html` — fragmentos de tela (1 arquivo por tela, só compõem componentes)
- `telas.html` — galeria montada com todos os fragmentos
- `img/avatars/` — 4 atletas ilustrados (mulher/homem, negros/brancos, cada um numa pose de jogo; gerados com gemini-3-pro-image — script `gen_avatars.py` no scratchpad da sessão), usados no onboarding "Monte seu atleta" e no card de perfil da home; subpasta `t/` tem as versões com fundo transparente
- `img/login-bg.mp4` — motion do login (Veo 3.1, 8s, 9:16, estilo flat das ilustrações: saque → forehand → zoom na bolinha → voleio; original em ~/Downloads/cerol-login-bg.mp4; script `gen_login_video.py` no scratchpad)
- `prototipo.js` — mapa de navegação do protótipo (regra = seletor + texto + ação; edite o MAPA)
- `prototipo.html` — protótipo navegável para teste de navegação (1 tela por vez, voltar com Esc, menu ☰, deep-link `#tela-x`)
