/* =====================================================================
   CEROL · Protótipo navegável — roteador + mapa de navegação
   Editável à mão: o MAPA no meio do arquivo é a única coisa que você
   normalmente precisa mudar. Regra = [seletor, textoInicial|null, ação].
   Ações prontas: go('tela-x'), back, toast('msg'), pulse.
   Regra de ouro do protótipo: NADA fica sem resposta — o que não
   navega muda de estado (seg/toggle/slot/opção) ou pulsa.
   ===================================================================== */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const telas = $$('figure.g-cell');
  const hist = [];
  let atual = null;

  /* ---------- núcleo ---------- */
  function show(id, push) {
    const alvo = document.getElementById(id);
    if (!alvo) return;
    if (push !== false && atual && atual !== id) hist.push(atual);
    telas.forEach(t => t.classList.toggle('p-on', t.id === id));
    atual = id;
    const nome = $('#p-nome');
    if (nome) nome.textContent = id.replace('tela-', '').replace(/-/g, ' ');
    history.replaceState(null, '', '#' + id);
    fit();
  }
  function back() { show(hist.pop() || 'tela-home', false); }
  const go = id => () => show(id);
  function toast(msg) {
    return () => {
      const t = $('#p-toast');
      t.textContent = msg;
      t.classList.add('p-show');
      clearTimeout(t._h);
      t._h = setTimeout(() => t.classList.remove('p-show'), 2400);
    };
  }
  function ent(fns) { return el => fns.forEach(f => f(el)); } // encadeia ações
  function pulse(el) { el.classList.remove('p-pulse'); void el.offsetWidth; el.classList.add('p-pulse'); }
  function radio(sel) { // seleção única entre irmãos do mesmo tipo na tela ativa
    return el => { $$(sel, el.closest('figure')).forEach(o => o.classList.remove('is-on')); el.classList.add('is-on'); };
  }

  /* ---------- MAPA DE NAVEGAÇÃO (edite aqui) ---------- */
  const MAPA = {
    'tela-login': [
      ['.c-btn', null, go('tela-cadastro')], // Apple, Google (só ícone) e e-mail levam ao cadastro
    ],
    'tela-cadastro': [
      ['.c-chip', 'Sair', go('tela-login')],
      ['.c-btn', 'Continuar', go('tela-nivel')],
    ],
    'tela-nivel': [
      ['.c-chip', 'Pular', go('tela-atleta')],
      ['.c-btn', 'Continuar', go('tela-atleta')],
    ],
    'tela-atleta': [
      ['.c-chip', 'Pular', go('tela-modalidades')],
      ['.c-persona', null, el => { radio('.c-persona')(el); const img = el.querySelector('img'); if (img) $$('.c-pava').forEach(m => { m.src = img.src; }); }],
      ['.c-swatch', null, radio('.c-swatch')],
      ['.c-btn', 'Continuar', go('tela-modalidades')],
    ],
    'tela-modalidades': [
      ['.c-chip', 'Sair', go('tela-login')],
      ['.c-opt', null, radio('.c-opt')],
      ['.c-btn', 'Continuar', go('tela-quadras-freq')],
    ],
    'tela-quadras-freq': [
      ['.c-chip', 'Pular', go('tela-permissoes')],
      ['.c-chip', 'Adicionar', el => { el.classList.add('c-chip--lime'); el.textContent = 'Adicionada'; }],
      ['.c-btn', 'Continuar', go('tela-permissoes')],
    ],
    'tela-permissoes': [
      ['.c-btn', 'Continuar', ent([toast('Bola dentro! Registre a 1ª sessão em 48h: +100 XP e +50 Bolinhas'), go('tela-home')])],
    ],
    'tela-home': [
      ['.c-banner', null, go('tela-validacao')],
      ['.c-bell', null, go('tela-notificacoes')],
      ['.c-chip', 'Ver liga', go('tela-liga')],
      ['.c-chip', 'Abrir match', go('tela-match')],
      ['.c-chip', 'TOP 10', go('tela-liga')],
      ['.c-chip', 'Ver tudo', go('tela-historico')],
      ['.c-tile', 'Trilha em andamento', go('tela-estagio')],
      ['.c-row', '3 sessões', toast('Missão em andamento — registre pela bolinha')],
      ['.c-row', '20 saques', toast('Missão em andamento — registre pela bolinha')],
      ['.c-row', '1 partida', toast('Missão em andamento — registre pela bolinha')],
      ['.c-row', null, go('tela-validacao')],
      ['.c-profile', null, go('tela-perfil')],
      ['.c-tile--pine', null, go('tela-liga')],
    ],
    'tela-notificacoes': [
      ['.c-chip', 'Limpar', toast('Notificações limpas')],
      ['.c-row', 'Pedro confirmou', go('tela-validacao')],
      ['.c-row', 'Bia topou', go('tela-chat')],
      ['.c-row', 'Você subiu', go('tela-liga')],
      ['.c-row', 'Reserva hoje', go('tela-checkin')],
      ['.c-row', 'Desafio relâmpago', go('tela-desafio')],
    ],
    'tela-historico': [
      ['.c-row', null, go('tela-share')],
    ],
    'tela-explorar': [
      ['.c-seg>span', 'Partidas', go('tela-partidas')],
      ['.c-seg>span', 'Jogadores', go('tela-jogador')],
      ['.c-seg>span', 'Clubes', go('tela-clubes')],
      ['.c-input', null, go('tela-busca')],
      ['.c-row', null, go('tela-quadra')],
      ['.c-pin', null, go('tela-quadra')],
    ],
    'tela-busca': [
      ['.c-row', 'Pedro', go('tela-jogador')],
      ['.c-row', 'Clube Saibro', go('tela-quadra')],
      ['.c-row', 'Beira-Mar', go('tela-clube')],
      ['.c-row', null, go('tela-partidas')],
    ],
    'tela-partidas': [
      ['.c-btn', 'Topo!', toast('Candidatura enviada — o criador escolhe em breve')],
      ['.c-chip', 'Ver candidatos', toast('2 candidatos: Bia (3.1) e Rafa (5.2)')],
      ['.c-tile', null, go('tela-jogador')],
    ],
    'tela-jogador': [
      ['.c-chip', 'Desafiar', go('tela-match')],
      ['.c-chip', 'Seguir', toast('Seguindo Pedro — os jogos dele aparecem no seu feed')],
    ],
    'tela-clubes': [
      ['.c-chip', 'Criar clube', toast('Clube novo: de 5 a 50 membros — fora deste teste')],
      ['.c-chip', 'Entrar', toast('Pedido enviado ao clube')],
      ['.c-lrow', null, go('tela-clube')],
      ['.c-row', null, go('tela-clube')],
    ],
    'tela-clube': [
      ['.c-btn', 'Dar kudos', toast('Bola dentro! Kudos enviado ao clube')],
      ['.c-lrow', null, go('tela-jogador')],
      ['.c-row', null, go('tela-jogador')],
    ],
    'tela-checkin': [
      ['.c-btn', 'Fazer check-in', ent([toast('Check-in feito · +300 XP presencial'), go('tela-home')])],
      ['.c-chip', 'Problemas', toast('Recepção avisada — te chamam no balcão')],
    ],
    'tela-jogar-sheet': [
      ['.c-opt', 'Registrar sessão', go('tela-modo-sessao')],
      ['.c-opt', 'Registrar partida', go('tela-partida')],
      ['.c-opt', 'Abrir match', go('tela-match')],
      ['.c-opt', 'Reservar quadra', go('tela-quadra')],
      ['.c-btn', 'Fechar', back],
      ['.c-tile', null, go('tela-home')],
    ],
    'tela-modo-sessao': [
      ['.c-opt', 'Manual retroativo', go('tela-sessao-manual')],
      ['.c-opt', 'Apple Saúde', ent([toast('Treino de tênis importado do Apple Saúde'), go('tela-recompensa')])],
      ['.c-opt', null, radio('.c-opt')],
      ['.c-btn', 'Começar', go('tela-sessao')],
    ],
    'tela-sessao-manual': [
      ['.c-btn', 'Salvar sessão', go('tela-recompensa')],
    ],
    'tela-sessao': [
      ['.c-chip', '+1', el => { const n = $('.t-num-xl', el.closest('.c-tile')); if (n) n.textContent = String(parseInt(n.textContent, 10) + 1); }],
      ['.c-btn', 'Encerrar sessão', go('tela-recompensa')],
      ['.c-btn', 'Pausar', el => { el.textContent = el.textContent.trim() === 'Pausar' ? 'Retomar' : 'Pausar'; }],
    ],
    'tela-recompensa': [
      ['.c-btn', 'Compartilhar no clube', go('tela-share')],
      ['.c-btn', 'Fechar', go('tela-home')],
    ],
    'tela-share': [
      ['.c-opt', 'Stories', toast('Card enviado para os Stories')],
      ['.c-opt', 'Feed do clube', ent([toast('Publicado no feed — "Bola dentro!"'), go('tela-home')])],
      ['.c-opt', 'Salvar imagem', toast('Imagem salva na galeria')],
    ],
    'tela-partida': [
      ['.c-opt', 'Adversário sem app', toast('Mostre o QR para o adversário escanear')],
      ['.c-opt', null, radio('.c-opt')],
      ['.c-btn', 'Continuar', go('tela-partida-local')],
    ],
    'tela-partida-local': [
      ['.c-opt', null, radio('.c-opt')],
      ['.c-btn', 'Continuar', go('tela-partida-placar')],
    ],
    'tela-partida-placar': [
      ['.c-btn', 'Enviar para validação', ent([toast('Placar enviado — aguardando o Pedro (48h)'), go('tela-home')])],
      ['.c-btn', 'Validar por QR', toast('Aponte a câmera do adversário para o QR')],
    ],
    'tela-validacao': [
      ['.c-btn', 'Confirmar placar', ent([toast('Partida validada · +120 XP · rating atualizado'), go('tela-home')])],
      ['.c-btn', 'Contestar', ent([toast('Placar devolvido para correção'), go('tela-partida-placar')])],
    ],
    'tela-liga': [
      ['.c-lrow.is-you', null, go('tela-perfil')],
    ],
    'tela-ranking-cidade': [
      ['.c-chip', 'Como o rating funciona', toast('Rating 1.0–7.0 tipo UTR: só partidas validadas contam')],
      ['.c-lrow', null, go('tela-jogador')],
    ],
    'tela-trilhas': [
      ['.c-tile', null, go('tela-estagio')],
    ],
    'tela-estagio': [
      ['.c-btn', 'Registrar tentativa', go('tela-modo-sessao')],
    ],
    'tela-desafio': [
      ['.c-chip', 'Entrar', toast('Você entrou no relâmpago — 200 saques até domingo')],
      ['.c-btn', 'Inscrito', toast('Inscrição já ativa — medalha garantida')],
    ],
    'tela-desafio-inscricao': [
      ['.c-btn', 'Garantir medalha', ent([toast('Inscrição confirmada · R$ 79 — medalha chega em outubro'), go('tela-desafio')])],
    ],
    'tela-temporada': [
      ['.c-btn', 'Quero jogar', toast('Vaga no Finals solicitada')],
    ],
    'tela-loja': [
      ['.c-seg>span', 'Visual', go('tela-loja-visual')],
      ['.c-seg>span', 'Desafios', go('tela-desafio')],
      ['.c-seg>span', 'Artigos', toast('Artigos esportivos — fase 2 (marketplace)')],
      ['.c-btn', 'Resgatar', toast('Cupom resgatado · −500 bolinhas')],
      ['.c-btn', 'Comprar', toast('Moldura comprada · −300 bolinhas')],
      ['.c-btn', 'Participar', toast('Você está no sorteio · −100 bolinhas')],
      ['.c-btn', 'Inscrever', go('tela-desafio-inscricao')],
    ],
    'tela-loja-visual': [
      ['.c-seg>span', 'Cupons', go('tela-loja')],
      ['.c-seg>span', 'Desafios', go('tela-desafio')],
      ['.c-seg>span', 'Artigos', toast('Artigos esportivos — fase 2 (marketplace)')],
      ['.c-btn', 'R$', go('tela-produto')],
    ],
    'tela-produto': [
      ['.c-btn', 'Comprar', go('tela-checkout')],
      ['.c-btn', 'Presentear', toast('Presente — escolha o amigo (fora deste teste)')],
    ],
    'tela-checkout': [
      ['.c-opt', null, el => { $$('.c-opt', el.closest('figure')).forEach(o => o.classList.remove('is-on')); el.classList.add('is-on'); }],
      ['.c-btn', 'Pagar', ent([toast('Pagamento aprovado no gateway · Visa •••• 6411'), go('tela-venda')])],
    ],
    'tela-venda': [
      ['.c-btn', 'Acompanhar pedido', toast('Pedido #4821 — rastreio chega por notificação')],
      ['.c-btn', 'Voltar à loja', go('tela-loja-visual')],
      ['.c-chip', 'recibo', toast('Recibo #4821 — também em Perfil › Pagamentos')],
      ['.c-chip', 'Abrir match', go('tela-match')],
    ],
    'tela-perfil': [
      ['.c-row', 'Estatísticas', go('tela-estatisticas')],
      ['.c-row', 'Conquistas', go('tela-conquistas')],
      ['.c-row', 'Clubes e amigos', go('tela-amigos')],
      ['.c-row', 'Visual do atleta', go('tela-visual')],
      ['.c-row', 'Assinatura Pro', go('tela-pro')],
      ['.c-row', 'Pagamentos', go('tela-pagamento')],
      ['.c-row', 'Configurações', go('tela-config')],
    ],
    'tela-estatisticas': [
      ['.c-row', null, go('tela-share')],
    ],
    'tela-conquistas': [
      ['.c-emblem', null, toast('Todo emblema tem critério mensurável — toque abre o detalhe')],
      ['.c-chip', 'Ver critério', toast('Desafio Saibro: 3.000 bolas em 30 dias · medalha física')],
    ],
    'tela-pro': [
      ['.c-btn', 'Assinar Pro', ent([toast('Pro ativo — cobrança no gateway, cancele quando quiser'), go('tela-perfil')])],
    ],
    'tela-amigos': [
      ['.c-chip', 'Desafiar', go('tela-match')],
      ['.c-chip', 'Abrir', go('tela-clube')],
      ['.c-btn', 'Convidar amigo', toast('Convite copiado — manda no grupo do racha')],
      ['.c-row', null, go('tela-jogador')],
    ],
    'tela-config': [
      ['.c-row', 'Ajuda', go('tela-suporte')],
      ['.c-row', 'Baixar meus dados', toast('Export LGPD chega por e-mail em até 48h')],
      ['.c-row', 'Consentimentos', toast('Consentimentos versionados — LGPD')],
      ['.c-row', 'Apagar conta', toast('Confirmação dupla + carência de 30 dias — fora deste teste')],
      ['.c-btn', 'Sair', go('tela-login')],
    ],
    'tela-visual': [
      ['.c-persona', null, el => { radio('.c-persona')(el); const img = el.querySelector('img'); if (img) $$('.c-pava').forEach(m => { m.src = img.src; }); }],
      ['.c-swatch', null, radio('.c-swatch')],
      ['.c-chip', 'Finals', toast('Moldura Finals — desbloqueia jogando o playoff presencial')],
      ['.c-btn', 'Salvar visual', ent([toast('Visual salvo'), go('tela-perfil')])],
    ],
    'tela-pagamento': [
      ['.c-tile--outline', null, go('tela-cartao')],
    ],
    'tela-cartao': [
      ['.c-btn', 'Salvar cartão', ent([toast('Cartão salvo · Visa •••• 6411 — só bandeira e 4 dígitos ficam no app'), go('tela-pagamento')])],
    ],
    'tela-chat': [
      ['.c-chip', 'Remarcar', toast('Proposta de novo horário enviada ao Pedro')],
      ['.c-chip', 'Confirmado!', toast('Mensagem enviada')],
      ['.c-chip', 'Levo bolas', toast('Mensagem enviada')],
      ['.c-chip', 'Cheguei', toast('Mensagem enviada')],
      ['.c-banner', null, go('tela-quadra')],
      ['.c-input', null, toast('Teclado fora deste teste — use os atalhos')],
    ],
    'tela-suporte': [
      ['.c-row', 'Como o rating', toast('Rating 1.0–7.0 tipo UTR — só partidas validadas contam')],
      ['.c-row', 'Contestei', toast('Contestação: re-submissão em até 48h; reincidência vai ao antifraude')],
      ['.c-row', 'Reembolso', toast('Reembolso integral até o início do desafio')],
      ['.c-row', 'Meus dados', go('tela-config')],
      ['.c-row', 'Falar com o suporte', toast('Chat com o suporte — fora deste teste')],
      ['.c-btn', 'Denunciar', toast('Denúncia registrada — a moderação comunitária analisa')],
    ],
    'tela-quadra': [
      ['.c-btn', 'Confirmar e pagar', ent([toast('Reserva confirmada · sex 19:00 · +300 XP no check-in'), go('tela-home')])],
    ],
    'tela-match': [
      ['.c-btn', 'Publicar match', ent([toast('Match publicado — avisamos jogadores compatíveis'), go('tela-explorar')])],
    ],
  };

  /* ---------- tab bar global ---------- */
  const TABS = { 'Início': 'tela-home', 'Explorar': 'tela-explorar', 'Ligas': 'tela-liga', 'Loja': 'tela-loja' };

  /* ---------- subnav injetada no grupo Ligas (só no protótipo) ---------- */
  const LIGAS = { 'tela-liga': 'Liga', 'tela-ranking-cidade': 'Cidade', 'tela-trilhas': 'Trilhas', 'tela-desafio': 'Desafio', 'tela-temporada': 'Temporada' };
  Object.keys(LIGAS).forEach(id => {
    const t = document.getElementById(id);
    if (!t) return;
    const bar = document.createElement('div');
    bar.className = 'u-flex u-wrap p-subnav';
    bar.innerHTML = Object.keys(LIGAS).map(x =>
      `<span class="c-chip ${x === id ? 'c-chip--ink' : ''}" data-go="${x}">${LIGAS[x]}</span>`).join('');
    const screen = $('.c-screen', t);
    screen.insertBefore(bar, screen.children[1] || null);
  });

  /* ---------- clique ---------- */
  const CLICAVEL = '.c-btn,.c-chip,.c-opt,.c-row,.c-lrow,.c-tab,.c-fab,.c-slot,.c-seg>span,.c-toggle,.c-pin,.c-bell,.c-avatar,.c-banner,.c-persona,.c-swatch,.c-tile--outline,.c-input,.c-emblem,.c-tile';
  document.addEventListener('click', e => {
    const hudGo = e.target.closest('[data-go]');
    if (hudGo) { e.preventDefault(); return show(hudGo.dataset.go); }
    if (e.target.closest('#p-hud')) return;
    const tela = e.target.closest('figure.g-cell');
    if (!tela) return;
    const el = e.target.closest(CLICAVEL);
    if (!el) return;
    e.preventDefault();

    if (el.classList.contains('c-fab')) return show('tela-jogar-sheet');
    if (el.classList.contains('c-tab')) { const d = TABS[el.textContent.trim()]; if (d) return show(d); }
    if (el.matches('.c-chip') && $('use[href="#i-x"]', el)) return back();
    /* chip só-ícone (chev) no appbar = voltar — padrão das subtelas do Perfil */
    if (el.matches('.c-appbar .c-chip') && $('use[href="#i-chev"]', el) && !el.textContent.trim()) return back();
    if (tela.id === 'tela-pagamento' && el.matches('.c-appbar .c-chip')) return back();

    for (const [sel, txt, acao] of (MAPA[tela.id] || [])) {
      if (el.matches(sel) && (!txt || el.textContent.trim().startsWith(txt))) return acao(el);
    }
    /* estados genéricos — nada fica sem resposta */
    if (el.matches('.c-seg>span')) { $$('span', el.parentElement).forEach(s => s.classList.remove('is-on')); el.classList.add('is-on'); return; }
    if (el.classList.contains('c-toggle')) return void el.classList.toggle('is-on');
    if (el.classList.contains('c-slot') && !el.classList.contains('is-off')) { $$('.c-slot', tela).forEach(s => s.classList.remove('is-on')); el.classList.add('is-on'); return; }
    if (el.classList.contains('c-opt') && tela.id === 'tela-nivel') { $$('.c-opt', tela).forEach(o => o.classList.remove('is-on')); el.classList.add('is-on'); return; }
    pulse(el);
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') back(); });

  /* ---------- escala para caber na janela ---------- */
  function fit() {
    const w = $('#p-wrap');
    if (!w) return;
    const s = Math.min(1, (innerHeight - 96) / 850, (innerWidth - 32) / 396);
    w.style.transform = 'scale(' + s + ')';
  }
  addEventListener('resize', fit);

  /* ---------- início (aceita deep-link #tela-x) ---------- */
  const inicial = location.hash.slice(1);
  show(document.getElementById(inicial) ? inicial : 'tela-login', false);
})();
