# 04 · Roadmap — de Florianópolis para o mundo

**Estratégia:** densidade antes de amplitude. O app nasce hiperlocal (bairro a bairro na Grande Floripa, por dentro de academias), prova o loop, e escala por "City Packs" replicáveis — com a fundação técnica global desde o dia 1.

## 1. Linha do tempo (anos 1–2, dos documentos-fonte)

| Fase | Período | Foco | Marcos |
|---|---|---|---|
| **T0** | mês 0–1 | Discovery e fundação | Entrevistas, protótipo, marca no INPI, 5 academias-piloto, decisão de squad |
| **T1** | mês 2–5 | MVP + lançamento | Beta fechado (200–400 usuários via 5 academias), Evento 1 "Rally de Abertura", 3 mil downloads |
| **T2** | mês 5–8 | Temporada 1 | Ligas rodando, 1º desafio com medalha, Finals (Evento 2), painel do professor v1 |
| **T3** | mês 8–12 | Expansão Sul + monetização | Itajaí/BC, Joinville, Curitiba, POA; patrocínios; preparar seed |
| **T4** | ano 2 | Diferencial técnico | Visão computacional (contador de bolas/golpes por vídeo), padel, marketplace de rachas e aulas |

### Escopo do MVP (16 semanas: 3 discovery + 10 build + 3 beta)

**Dentro:** onboarding com autoavaliação NTRP + modalidades (tênis/beach) + quadras; registro de sessão (timer/contador/HealthKit-Google Fit); XP, níveis, streaks, missões e 2 trilhas (Saque + Constância); liga semanal + ranking da cidade; partida validada com rating 1.0–7.0; desafio do mês com medalha física; clubes v0 + feed com kudos.

**Fora (por decisão):** visão computacional, sensores, marketplace, matchmaking avançado, padel, battle pass pago.

### Os dois ritos presenciais

- **Evento 1 — Rally de Abertura (mês 5):** festival de 1 dia em Floripa — torneio relâmpago por níveis, clínica com professores parceiros, desafio de radar (velocidade de saque vale XP no app), ativação de download. Meta: 200–300 participantes, 800+ downloads na semana.
- **Evento 2 — Finals da Temporada 1 (mês 7–8):** playoff presencial das ligas (top 8/12/16 por divisão) + torneio aberto + premiação. O momento em que o digital vira rito presencial.

## 2. Fases de expansão local → global

### Fase 1 · Hiperlocal (Grande Floripa, ano 1)
- Lançar **por dentro** de academias, ligas e grupos existentes (mitiga o chicken-and-egg).
- 10–15 professores-embaixadores comissionados como canal primário de aquisição (CAC alvo R$ 18–35).
- Densidade por bairro antes de amplitude; PR local pronto: "app de tênis nasce na terra do Guga".

### Fase 2 · Regional Sul (mês 8–12)
- **City Pack** replicável por cidade: 5 academias-âncora + 10 embaixadores + 1 evento de abertura + geotarget de mídia.
- Itajaí/Balneário, Joinville, Curitiba, Porto Alegre.

### Fase 3 · Nacional (ano 2)
- SP e Rio (maiores mercados), calendário adaptado à sazonalidade (missões indoor/paredão no inverno/chuva).
- Marketplace de quadras/aulas/serviços (take 8–12%), padel como segunda modalidade de expansão, visão computacional como diferencial defensável.

### Fase 4 · Global (ano 2–3)
- **LatAm primeiro** (ES; cultura de saibro e beach tennis), depois EUA/Europa (EN).
- Rating interoperável (âncora conceitual no UTR) para credibilidade internacional.
- Parcerias de pagamento por país; medalhas com fornecedores regionais (logística local).

### Fundação "global-ready" desde o MVP (custo marginal baixo agora, caríssimo depois)
- Strings 100% externalizadas (i18n PT → EN/ES), unidades e formatos por locale, timezone-safe.
- Multi-moeda na carteira e no gateway; preços por região via feature flag.
- Ligas e rankings particionados por cidade (o mesmo mecanismo serve qualquer geografia).
- LGPD → arquitetura de consentimento compatível com GDPR/CCPA.
- Cloud multi-region ready (backend gerenciado: Supabase/Firebase).

## 3. Metas norte de 12 meses

| Horizonte | Meta | Indicador de sucesso |
|---|---|---|
| Mês 3 (beta) | 400 usuários via 5 academias | D7 > 25%; NPS > 40 |
| Mês 5 (lançamento + Evento 1) | 3.000 downloads na Grande Floripa | 800+ downloads na semana do evento; 300 atletas presentes |
| Mês 8 (Finals T1 + Evento 2) | 7.000 usuários; 500–700 assinantes; 1º desafio com 400+ medalhas | Receita mensal R$ 15–25 mil; 15 academias B2B |
| Mês 12 | 12.000+ usuários; 900–1.200 assinantes; expansão SC/Sul iniciada | ARR R$ 250–400 mil; churn < 6%; pronto para seed |

## 4. Modelo de receita (resumo)

| Linha | Preço | Nota |
|---|---|---|
| Assinatura Pro | R$ 14,90–24,90/mês | ARPU alvo ~R$ 16; payback < 4 meses |
| Desafios com medalha | R$ 59–99 | Margem 40–60% |
| Eventos presenciais | R$ 80–150 | 2 por temporada |
| B2B painel do professor/academia | R$ 99–299/mês | Sinergia direta com o On Tennis (app_123) |
| Patrocínios | variável | Marcas de raquete/varejo cobrindo eventos |
| Marketplace (fase 2) | take 8–12% | Quadras, aulas, serviços, artigos |

**Orçamento (6–8 meses):** enxuto ~R$ 220 mil · base recomendado ~R$ 365 mil · confortável ~R$ 560–620 mil. Financiamento: recursos próprios + FFF; pré-seed anjo local (ACATE/anjos SC); patrocínio de marcas; Lei de Incentivo ao Esporte para a camada de eventos.

## 5. Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Frieza de comunidade (chicken-and-egg) | Alto | Lançar por dentro de academias/ligas existentes; densidade por bairro antes de amplitude |
| Fraude em auto-relato | Médio | Economia separada (rating só com validação), tetos, vídeo amostral, denúncia |
| Sazonalidade e chuva | Médio | Missões indoor/paredão/físico; calendário de desafios adaptado ao inverno |
| Reação de incumbentes (LetzPlay etc.) | Médio | Velocidade + foco em treino/hábito (fora do core deles); integrar em vez de competir por torneio |
| Uso indevido de marca (Guga) | Alto se ignorado | Não usar nome/imagem sem contrato; parceria formal ou temas próprios |
| CAC alto em mídia paga | Médio | Professores-embaixadores como canal primário; eventos como máquina de conteúdo |
| Logística de medalhas | Baixo | 2 fornecedores homologados; estoque de segurança por desafio |
| LGPD e dados de menores | Médio | Cadastro 18+ no MVP; consentimento parental na fase juvenil |
