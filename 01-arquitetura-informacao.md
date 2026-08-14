# 01 · Arquitetura de Informação

## 1. Navegação principal — bottom nav (5 slots, FAB central)

O menu inferior é o esqueleto do app. Regra: **toda ação primária a no máximo 2 toques da home**.

| Slot | Nome | Ícone | O que abre |
|---|---|---|---|
| 1 | **Início** | casa | Home: liga, últimos jogos, insights, missões |
| 2 | **Explorar** | pin de mapa | Mapa e listas: quadras, partidas abertas, jogadores, clubes |
| 3 | **Jogar** (FAB central, destaque lime) | bolinha de tênis | Sheet com 4 ações: Registrar sessão · Registrar partida · Abrir match · Reservar quadra |
| 4 | **Ligas** | troféu | Liga semanal, rankings, trilhas, desafios, temporada |
| 5 | **Loja** | sacola | Cupons e cosméticos (Bolinhas), desafios com medalha (R$), artigos e serviços |

**Perfil** não ocupa slot: o avatar (com anel de nível) fica fixo no header de todas as tabs e abre o Cartão de Jogador. Notificações no sino, também no header.

## 2. Sitemap completo

```
CEROL
│
├── ONBOARDING (primeiro uso)
│   ├── Splash → Login (Apple / Google / e-mail)
│   ├── Cadastro básico (nome, nascimento — gate 18+, cidade)
│   ├── Autoavaliação de nível (estilo NTRP, 6 perguntas → rating provisório)
│   ├── Modalidades (tênis / beach tennis)
│   ├── Quadras que frequenta (sugestão por geolocalização)
│   ├── Permissões (push, localização, HealthKit/Google Fit)
│   └── Primeira missão "Bola dentro!" (ativação em 48h)
│
├── INÍCIO (tab 1)
│   ├── Header: avatar+nível · streak 🔥 · Bolinhas · notificações
│   ├── Sua Liga (divisão, posição na coorte de 30, contagem regressiva)
│   ├── Compromisso contextual (partida marcada / placar a confirmar / reserva)
│   ├── Últimos jogos (3 itens + histórico)
│   ├── Insights (carrossel de cards gerados por regras)
│   ├── Missões da semana (3, com progresso)
│   └── Trilha em andamento (estágio atual + próxima missão)
│
├── EXPLORAR (tab 2)
│   ├── Mapa (3 camadas: quadras · partidas abertas · jogadores disponíveis)
│   ├── Quadras
│   │   ├── Lista / filtros (distância, preço, modalidade, tipo de piso)
│   │   └── Detalhe da quadra → horários → reserva
│   ├── Partidas abertas (matches) — filtro por rating, distância, horário
│   ├── Jogadores próximos (opt-in "disponível para jogar")
│   └── Clubes (5–50 membros, ranking entre clubes, feed com kudos)
│
├── JOGAR (FAB central — sheet de ações)
│   ├── Registrar sessão (timer / contador / HealthKit / manual retroativo)
│   ├── Registrar partida (placar → validação bilateral → rating)
│   ├── Abrir pedido de match (tipo, nível, local, hora, visibilidade)
│   └── Reservar quadra (atalho para Explorar › Quadras)
│
├── LIGAS (tab 4)
│   ├── Liga semanal (divisões Bronze→Elite, coorte de 30, zera 2ª-feira)
│   ├── Ranking da cidade (por rating validado)
│   ├── Trilhas de fundamento (skill tree: 6 trilhas × 10 estágios)
│   ├── Desafios
│   │   ├── Desafio do mês (pago, medalha física — modelo Domirun)
│   │   └── Desafios relâmpago (48–72h, grátis, Bolinhas + badges)
│   └── Temporada (10–12 semanas: trilha gratuita de recompensas + Finals)
│
├── LOJA (tab 5)
│   ├── Destaques / cupons de parceiros (500 Bolinhas = R$10)
│   ├── Cosméticos de perfil (molduras, temas, raquetes ilustradas — Bolinhas)
│   ├── Desafios com medalha física (R$ 59–99)
│   ├── Artigos esportivos (fase 1: afiliados/parceiros · fase 2: marketplace)
│   └── Serviços (aulas, encordoamento, clínicas — fase 2, take 8–12%)
│
├── PERFIL (avatar no header)
│   ├── Cartão de Jogador (nível XP + faixa de bola, rating, streak, badges)
│   ├── Estatísticas e histórico completo de jogos
│   ├── Conquistas e medalhas (digitais + físicas)
│   ├── Assinatura Pro (R$ 14,90–24,90/mês)
│   ├── Pagamentos (cartões tokenizados, Pix, histórico, recibos)
│   ├── Clubes e amigos
│   └── Configurações (conta, privacidade/LGPD, notificações, unidades/idioma)
│
└── TRANSVERSAIS
    ├── Notificações push contextuais (gatilhos do loop de hábito)
    ├── Busca global (jogadores, quadras, clubes)
    ├── Compartilhamento (cartão de resultado para stories)
    └── Suporte / FAQ / denúncia comunitária
```

## 3. Entidades de dados (modelo conceitual)

| Entidade | Campos-chave | Observações |
|---|---|---|
| **Usuário** | auth, e-mail, nascimento (18+), cidade | LGPD: consentimentos versionados |
| **Perfil de Jogador** | nível XP, faixa de bola, rating (1.0–7.0, flag provisório), streak, Bolinhas, modalidades | Rating separado de XP por design |
| **Sessão** | tipo (treino/paredão/aula/físico), duração, fonte (timer/contador/health/manual), XP gerado | Auto-relato: conta p/ XP com teto, nunca p/ rating |
| **Partida** | jogadores, placar, quadra, status de validação (pendente/validada/contestada) | Só validada altera rating e vale peso 2× em PL |
| **Liga/Coorte** | divisão, 30 jogadores, semana, PL por jogador | Zera toda segunda; top 10 sobem, últimos 5 caem |
| **Missão** | tipo (semanal/trilha/desafio), critério mensurável, recompensa | Ex.: "acerte 20 de 30 saques em 3 sessões" |
| **Trilha/Estágio** | fundamento (6), estágio (1–10), validação (auto/vídeo/professor) | Selo verificado conecta ao B2B |
| **Desafio** | tema, período, meta de volume, preço, medalha, logística | Amostragem de vídeo antifraude |
| **Carteira/Transação** | moeda (XP/PL/Bolinhas), fonte, sink, saldo | Emissão ≤ queima (meta inflação zero) |
| **Quadra** | local, dono (academia parceira/pública/marketplace), preço/h, horários | Inventário vem do painel B2B (app_123) |
| **Reserva** | quadra, slot, jogador(es), pagamento, check-in | Check-in por geofence dá XP presencial |
| **Pedido de Match** | tipo, faixa de rating, local/raio, data/hora, visibilidade, candidatos | Estado: aberto → aceito → confirmado → jogado |
| **Clube** | 5–50 membros, ranking, feed | Kudos "Bola dentro!" |
| **Produto/Cupom** | tipo (cosmético/cupom/físico/serviço), preço (Bolinhas ou R$) | Split payment no marketplace |
| **Assinatura** | plano Pro, status, gateway | Recorrência via gateway (PCI fora do app) |

## 4. Regras de hierarquia

- **Home nunca é dashboard genérico**: os 3 blocos obrigatórios são *ranking (sua liga)*, *últimos jogos* e *insights* — nessa ordem de prioridade após o compromisso contextual.
- **Explorar é o mundo físico** (mapa-first); **Ligas é o mundo competitivo**; **Loja é o mundo de recompensas**. Nada de sobreposição de conteúdo entre tabs.
- **FAB Jogar é a ação âncora** do loop de hábito — sempre visível, sempre no mesmo lugar, o item mais brilhante da interface (lime `#99cc00`).
- Estados vazios sempre apontam para a próxima ação do loop (ex.: sem jogos → "registre sua primeira sessão").
