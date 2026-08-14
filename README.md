# CEROL · Estruturação do Produto

> App de gamificação de tênis e beach tennis — "o Strava + Domirun do tênis brasileiro".
> Baseado em: *Apresentação Cerol Gamificação* (43pp) e *Gamificação do Tênis — Pesquisa e Plano de Negócios* (jul/2026).

## Tese em uma linha

Transformar cada treino e cada partida amadora em progresso visível, competição saudável e rito social — **sem hardware** no MVP, começando denso em Florianópolis e desenhado desde o dia 1 para escalar globalmente.

## Os 4 pilares do produto

1. **Registro sem fricção** — registrar uma sessão leva 30–60s (timer, contador, HealthKit/Google Fit).
2. **Progressão significativa** — XP mede dedicação (nunca habilidade); qualquer nível técnico chega ao topo com constância.
3. **Competição saudável** — ligas semanais de coorte + rating validado bilateral que nunca infla.
4. **Rito presencial** — o digital culmina em eventos físicos (Rally de Abertura, Finals da Temporada) e medalhas reais.

## Documentos

| Doc | Conteúdo |
|---|---|
| [01-arquitetura-informacao.md](01-arquitetura-informacao.md) | Sitemap completo, navegação inferior, entidades de dados |
| [02-fluxos.md](02-fluxos.md) | Todos os fluxos: cadastro, home, sessão, partida, quadra, match, geo, pagamento, loja |
| [03-gamificacao-e-pontos.md](03-gamificacao-e-pontos.md) | Loop de hábito, 3 eixos, economia de 3 moedas, trilhas, desafios, antifraude |
| [04-roadmap-local-global.md](04-roadmap-local-global.md) | T0→T4 + fases de expansão global, métricas norte, riscos |
| [05-home-navegacao-gamefeel.md](05-home-navegacao-gamefeel.md) | Spec da home (ranking · últimos jogos · insights), bottom nav, princípios de game-feel |
| [design/](design/) | DS Court Mode: `ds.css` (componentes), `icons.svg.html` (sprite), `components.html` (biblioteca), `screens/` (20 telas), `telas.html` (galeria), `build.py` (monta tudo), `DIRECAO.md` (direção + vocabulário) |

## Princípios transversais (decisões já tomadas nos documentos-fonte)

- **3 eixos que não se misturam**: XP (jornada) ≠ Pontos de Liga (semana) ≠ Rating (habilidade). XP e Bolinhas jamais inflam o rating.
- **Sem moeda comprável no MVP** — evita pay-to-win; monetização vem de assinatura, desafios e eventos.
- **Validação bilateral** como fonte única de verdade competitiva.
- **Cadastro 18+ no MVP** (LGPD); consentimento parental só na fase juvenil.
- **Local → global**: densidade por bairro antes de amplitude; i18n e multi-moeda embutidos na fundação técnica.
- **Sinergia com a plataforma On Tennis (app_123)**: o sistema de reservas/admin já construído vira o painel B2B de academias e professores — inventário de quadras e o selo "validado por professor" se conectam por ali.
