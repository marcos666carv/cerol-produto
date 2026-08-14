# 02 · Fluxos do Produto

Cada fluxo traz: objetivo, passos, estados de erro e a gamificação embutida (o que o jogador ganha).

---

## F1 · Cadastro & Onboarding

**Objetivo:** do download à primeira recompensa em menos de 3 minutos.

1. **Splash** → login com Apple / Google (1 toque) ou e-mail.
2. **Dados básicos**: nome, data de nascimento (gate 18+ no MVP — LGPD), cidade.
3. **Autoavaliação de nível** (estilo NTRP, 6 perguntas visuais de 1 toque cada: frequência, saque, troca de bolas, rede, competição, tempo de prática) → gera **rating provisório** (ex.: 2.5 · selo "provisório até 3 partidas validadas").
3b. **Monte seu atleta**: gênero, tom de pele e estilo do personagem ilustrado (4 ilustrações na mesma pose/roupa base — mulher/homem, negros/brancos, cada um com uma pose de jogo). O atleta escolhido vira o avatar do card de perfil da home; muda depois em Perfil › Visual.
4. **Modalidades**: tênis, beach tennis ou ambos.
5. **Quadras que frequenta**: sugestão automática por geolocalização (raio 10 km) + busca; mínimo 0, ideal 1+.
6. **Permissões** (com racional exibido antes do prompt nativo):
   - Notificações → "é assim que a liga te avisa" (crítica para o loop);
   - Localização → "para achar quadras e jogos perto de você" (opcional);
   - HealthKit / Google Fit → "registre treinos sem esforço" (opcional).
7. Aterrissa direto na **Home** com a liga da semana já atribuída (coorte Bronze). Completar o cadastro dá **+50 XP** na hora (a barra de nível anima no primeiro segundo de app).
8. **Primeira missão — "Bola dentro!"** chega sem tela própria: toast/push + card de missão na home — registrar a primeira sessão em 48h vale **100 XP + 50 Bolinhas**.

**Erros/estados:** menor de 18 → tela de espera com e-mail de aviso da fase juvenil; sem geo → cidade manual; sem quadra escolhida → segue normalmente.

---

## F2 · Home (regras de composição)

Ordem fixa de blocos (detalhes visuais no doc 05):

1. **Header**: avatar+anel de nível · streak 🔥 · saldo de Bolinhas · sino.
2. **Compromisso contextual** (condicional): placar a confirmar > partida marcada hoje > reserva de quadra próxima.
3. **Sua Liga** (ranking): divisão, posição na coorte de 30, PL, contagem regressiva para domingo, mini-tabela (top 3 + vizinhos da sua posição).
4. **Últimos jogos**: 3 itens — adversário/tipo, resultado, ΔRating, XP ganho → histórico completo.
5. **Insights**: carrossel de cards gerados por regras sobre os dados do jogador (spec no doc 05).
6. **Missões da semana**: 3 com barra de progresso.
7. **Trilha em andamento**: estágio atual + próxima missão mensurável.

---

## F3 · Registrar sessão (como os pontos são marcados — parte 1)

**Objetivo:** fricção máxima de 30–60s por registro. Frequência-alvo: 3 sessões/semana.

1. FAB **Jogar** → *Registrar sessão*.
2. Escolhe o modo:
   - **Timer ao vivo** (inicia/pausa; roda em background);
   - **Contador** (bolas/saques — botão gigante de +1);
   - **Importar do HealthKit / Google Fit** (workout de tênis detectado → 1 toque);
   - **Manual retroativo** (data, duração, tipo).
3. Tipo da sessão: treino livre · paredão · aula · físico.
4. **Fim da sessão → tela de recompensa** (o momento de dopamina):
   - XP base (sessão 30min+ = **50 XP**) + bônus de missão/trilha;
   - Pontos de Liga equivalentes;
   - Chance de **Bolinhas** (recompensa variável, ~15–25% das ações + "crítico do dia");
   - Progresso de streak e de trilha animados.
5. Compartilhar no feed do clube (opcional) → recebe kudos "Bola dentro!".

**Antifarm:** teto de **400 XP/dia** em fontes auto-relatadas; auto-relato jamais toca o rating.

---

## F4 · Registrar partida validada (como os pontos são marcados — parte 2)

**Objetivo:** placar validado bilateral é a única fonte de verdade competitiva.

1. FAB **Jogar** → *Registrar partida* (ou fim de um match combinado no app) — assistente em **3 passos**:
2. **Passo 1 · Competidor**: busca + sugestões por histórico/rating; QR presencial para adversário sem app (vem preenchido se o match nasceu no app).
3. **Passo 2 · Onde e quando**: lugar (quadras conhecidas por geo), tipo de quadra (saibro/rápida/beach) e horário — contexto que alimenta estatísticas por piso e o antifraude (o jogo precisa ser plausível no tempo e no espaço).
4. **Passo 3 · Placar por sets** com resumo do contexto em chips → envia.
5. **Adversário recebe push**: *Confirmar* ou *Contestar* (prazo 48h; sem resposta = pendente, não conta).
5. Validada →
   - **Rating 1.0–7.0** recalculado para ambos (algoritmo tipo UTR simplificado);
   - **120 XP** para ambos (vitória não vale mais XP — XP mede dedicação);
   - **Pontos de Liga com peso 2×**;
   - Card de resultado compartilhável.
6. Contestada → re-submissão corrigida ou descarte; reincidência de contestação alimenta o score antifraude.

---

## F5 · Marcar quadra

**Onde se pode marcar:** (a) **academias e clubes parceiros** — inventário e agenda vêm do painel B2B (o sistema de reservas On Tennis/app_123 já construído); (b) **quadras públicas** mapeadas — sem reserva, com *check-in*; (c) fase 2: qualquer dono de quadra lista no marketplace.

1. **Explorar** → Quadras (mapa ou lista) — filtros: distância, preço/h, modalidade, piso, horário livre.
2. Detalhe da quadra: fotos, preço, avaliações, agenda de slots.
3. Seleciona **data + horário** (slots de 1h).
4. Opcional: **convidar parceiro** (amigo/clube ou "abrir match" direto para esse slot).
5. **Pagamento**: Pix (default BR) ou cartão salvo; recibo no app. Split automático: valor → academia, taxa → plataforma (fase 2; na fase 1 parceiras podem receber direto).
6. Confirmação + push de lembrete (24h e 2h antes).
7. **Check-in por geofence** no horário → **+300 XP presencial** (mesma mecânica de eventos).
8. Cancelamento: política por quadra (ex.: grátis até 12h antes); no-show penaliza prioridade futura, nunca o rating.

---

## F6 · Abrir pedido de match

**Objetivo:** ninguém fica sem jogar por falta de adversário do nível certo.

1. FAB **Jogar** → *Abrir match*.
2. Formulário de 1 tela:
   - Tipo: **simples · duplas · racha** (grupo);
   - Modalidade: tênis / beach;
   - **Nível-alvo**: faixa de rating (default: seu rating ±0.5);
   - **Local**: quadra já reservada, quadra sugerida, ou "a combinar" com raio (ex.: 5 km);
   - Data/hora (ou janela: "sábado de manhã");
   - Visibilidade: público · só clube · só amigos.
3. Publica → aparece em **Explorar › Partidas abertas** e no mapa; jogadores compatíveis (rating + raio) recebem push (matchmaking v1 = notificação simples; v2 = sugestões ranqueadas).
4. Interessados tocam **"Topo!"** → criador vê lista com cartão de jogador (rating, jogos, selo verificado) → aceita.
5. Confirmação bilateral → match vira **compromisso** na home de ambos, com chat leve para combinar detalhes.
6. Pós-jogo → fluxo F4 (placar → validação → rating/XP/PL).
7. Expirou sem aceite → sugestões automáticas: ampliar raio, ampliar faixa de rating, postar no clube.

---

## F7 · Geolocalização (procurar partidas e jogadores)

- **Mapa do Explorar com 3 camadas** alternáveis: quadras · partidas abertas · jogadores "disponíveis para jogar" (opt-in explícito).
- Filtros persistentes: raio (1–25 km), faixa de rating, modalidade, período do dia.
- **Privacidade por padrão**: posição de jogador nunca é exata — *fuzzing* de ~500 m e exibição por área; localização exata só é revelada ao confirmar um match (a quadra combinada). Desligar visibilidade a qualquer momento; menores jamais visíveis (18+ no MVP).
- Geo alimenta ainda: sugestão de quadras no onboarding, check-in por geofence (XP presencial), rachas com matchmaking por rating + proximidade, e o ranking da cidade.

---

## F8 · Dados de pagamento

**Princípio:** o app nunca vê nem armazena número de cartão — tokenização via gateway (Pagar.me / Stripe / Mercado Pago); PCI fica no gateway. Pix como método default no Brasil.

**Onde o pagamento entra:**

| Contexto | Tipo | Métodos |
|---|---|---|
| Assinatura **Pro** (R$ 14,90–24,90/mês) | recorrente | cartão tokenizado, Pix recorrente |
| **Desafio do mês** com medalha (R$ 59–99) | one-off + endereço de entrega | Pix, cartão, Apple/Google Pay |
| **Reserva de quadra** | one-off com split (fase 2) | Pix, cartão salvo |
| **Loja** (artigos/serviços — fase 2) | one-off, split marketplace 8–12% | Pix, cartão, wallets |

**Fluxo de cadastro do cartão:**
1. Perfil → Pagamentos → *Adicionar cartão* (ou inline no primeiro checkout).
2. Formulário seguro do gateway (SDK) → token retorna ao app; salvamos só bandeira + últimos 4 dígitos.
3. Confirmação com biometria do aparelho para compras futuras em 1 toque.
4. Pix não exige cadastro: QR/copia-e-cola gerado por transação, confirmação via webhook em segundos.

**Estados:** falha de pagamento de assinatura → retry 3× + downgrade suave (nunca apaga progresso); reembolso de desafio até o início do período; recibos e histórico em Perfil › Pagamentos.

---

## F9 · Loja

**Duas moedas, papéis distintos — sem moeda comprável no MVP (anti pay-to-win):**

| Seção | Compra com | Exemplos |
|---|---|---|
| Cupons de parceiros | **Bolinhas** | 500 Bolinhas = R$ 10 em encordoamento/aluguel de quadra |
| Cosméticos de perfil | **Bolinhas** (200–800) | molduras, temas, raquetes ilustradas, celebrações |
| Sorteios / entrada em desafio especial | **Bolinhas** (100 / 300) | brindes de patrocinador |
| Desafios com medalha física | **R$** (59–99) | "Desafio Saibro: 3.000 bolas em 30 dias" |
| Artigos esportivos | **R$** | fase 1: vitrine de parceiros/afiliados · fase 2: marketplace |
| Serviços | **R$** | aulas, encordoamento, clínicas — fase 2, take 8–12% |

**Fluxo de resgate com Bolinhas:** Loja → item → confirmar → débito na carteira → cupom com QR/código e validade → uso no parceiro → parceiro valida pelo painel B2B.

**Regra de economia:** emissão semanal média de Bolinhas por usuário ativo (~350) ≤ capacidade de queima; sinks revisados a cada temporada (meta: inflação zero).
