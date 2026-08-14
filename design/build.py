#!/usr/bin/env python3
"""Monta telas.html e prototipo.html a partir de screens/*.html e sincroniza o sprite.

Uso:  python3 build.py
Gera: telas.html (galeria), prototipo.html (navegável, 1 tela por vez, roteado
      por prototipo.js), _publish-*.html (versões com tudo embutido, para
      publicar como artifact) e re-injeta icons.svg.html em components.html
      entre os marcadores SPRITE.
"""
import base64, pathlib, re

BASE = pathlib.Path(__file__).parent
CSS = (BASE / "ds.css").read_text()
SPRITE = (BASE / "icons.svg.html").read_text()

GRUPOS = [
    ("Onboarding", "do download direto para a home em <3 min", ["01-login.html", "01b-cadastro.html", "02-nivel.html", "02b-atleta.html", "02c-modalidades.html", "02d-quadras-freq.html", "03-permissoes.html"]),
    ("Núcleo", "home · notificações · histórico · explorar · FAB jogar · busca", ["05-home.html", "04-notificacoes.html", "05b-historico.html", "06-explorar.html", "07-jogar-sheet.html", "24-busca.html"]),
    ("Registrar & pontuar", "modos de sessão · recompensa · compartilhar · partida em 3 passos · validação", ["08b-modo-sessao.html", "08-sessao.html", "08c-sessao-manual.html", "09-recompensa.html", "25-share.html", "10-partida.html", "10b-partida-local.html", "10c-partida-placar.html", "11-validacao.html"]),
    ("Explorar & social", "partidas abertas · jogador · clubes · chat do match", ["06b-partidas.html", "06c-jogador.html", "06d-clubes.html", "06e-clube.html", "26-chat.html"]),
    ("Competição", "liga · ranking da cidade · trilhas · desafios · temporada", ["12-liga.html", "12b-ranking-cidade.html", "13-trilhas.html", "13b-estagio.html", "14-desafio.html", "14b-desafio-inscricao.html", "15-temporada.html"]),
    ("Loja & conta", "loja · compra no gateway · perfil · stats · conquistas · Pro · configurações", ["16-loja.html", "16b-loja-visual.html", "21-produto.html", "22-checkout.html", "23-venda.html", "17-perfil.html", "17b-estatisticas.html", "17c-conquistas.html", "17d-pro.html", "17e-amigos.html", "17f-config.html", "17g-visual.html", "18-pagamento.html", "18b-cartao.html"]),
    ("Quadra, match & suporte", "reservar · check-in geofence · abrir match · ajuda", ["19-quadra.html", "19b-checkin.html", "20-match.html", "27-suporte.html"]),
]

TOTAL = sum(len(arqs) for _, _, arqs in GRUPOS)

HEAD = f"""<p class="t-label">Cerol · Design de Produto · Court Mode</p>
<h1 class="t-display" style="font-size:44px">Telas do app</h1>
<p class="t-body t-muted" style="max-width:62ch;margin-top:10px">{TOTAL} telas montadas exclusivamente com os componentes de <b>ds.css</b> (biblioteca em <b>components.html</b>). Direção visual: ON COURT + referências das pastas <i>ds</i> e <i>tennis-graphics</i>.</p>"""


def corpo():
    partes = []
    for titulo, sub, arquivos in GRUPOS:
        partes.append(f'<div class="g-group"><h2>{titulo}</h2><span>{sub}</span></div>\n<div class="g-grid">')
        for a in arquivos:
            p = BASE / "screens" / a
            partes.append(p.read_text() if p.exists() else f'<!-- FALTANDO: {a} -->')
        partes.append("</div>")
    return "\n".join(partes)


def inline_imgs(html: str) -> str:
    """Embute img/... (png/jpg/mp4) como data URI — artifacts bloqueiam requisições externas."""
    MIME = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".mp4": "video/mp4"}
    def rep(m):
        p = BASE / m.group(1)
        mime = MIME.get(p.suffix.lower())
        if not p.exists() or not mime:
            return m.group(0)
        return f'src="data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()}"'
    return re.sub(r'src="(img/[^"]+)"', rep, html)


def pagina(css_inline: bool) -> str:
    css = f"<style>\n{CSS}\n</style>" if css_inline else '<link rel="stylesheet" href="ds.css">'
    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CEROL · Telas do App</title>{css}</head>
<body class="ds g-page">
{SPRITE}
<div class="g-wrap"><header class="g-head">{HEAD}</header>
{corpo()}
<footer style="margin-top:48px"><p class="t-micro t-muted">CEROL · gerado por build.py — edite ds.css/screens/* e rode de novo.</p></footer>
</div></body></html>"""


# 1. telas.html (repo, css linkado) + versão de publicação (css e imagens embutidos)
(BASE / "telas.html").write_text(pagina(css_inline=False))
(BASE / "_publish-telas.html").write_text(inline_imgs(pagina(css_inline=True)))

# 1b. protótipo navegável (uma tela por vez; navegação em prototipo.js)
PROTO_CSS = """
  html,body{margin:0;background:#eceee9;overflow:hidden}
  /* no protótipo as telas rolam (na galeria são estáticas) */
  .c-phone .c-screen{overflow-y:auto;overflow-x:hidden;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .c-phone .c-screen::-webkit-scrollbar{display:none}
  .p-stage{height:100vh;display:flex;align-items:center;justify-content:center}
  #p-wrap{transform-origin:center}
  figure.g-cell{display:none;margin:0}
  figure.g-cell.p-on{display:block}
  figure.g-cell figcaption{display:none}
  .p-on .c-phone{animation:p-in .35s cubic-bezier(.625,.05,0,1)}
  @keyframes p-in{from{opacity:0;transform:translateY(12px)}}
  @keyframes p-pulso{50%{transform:scale(.96)}}
  .p-pulse{animation:p-pulso .28s cubic-bezier(.625,.05,0,1)}
  /* stagger de entrada: os blocos da tela sobem em cascata (30-40ms por item) */
  .p-on .c-screen>*{animation:m-rise .32s cubic-bezier(.625,.05,0,1) both}
  .p-on .c-screen>*:nth-child(2){animation-delay:.04s}
  .p-on .c-screen>*:nth-child(3){animation-delay:.08s}
  .p-on .c-screen>*:nth-child(4){animation-delay:.12s}
  .p-on .c-screen>*:nth-child(5){animation-delay:.16s}
  .p-on .c-screen>*:nth-child(n+6){animation-delay:.2s}
  .p-subnav{padding:2px 0}
  #p-hud{position:fixed;top:12px;left:12px;right:12px;display:flex;align-items:center;gap:8px;z-index:50;font-family:"Archivo",ui-sans-serif,system-ui,sans-serif}
  #p-hud .p-b{width:36px;height:36px;border-radius:999px;background:#0b120c;color:#ccff33;border:none;display:grid;place-items:center;cursor:pointer;font-size:15px}
  #p-nome{font-family:ui-monospace,Menlo,monospace;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#565d55;background:#fff;padding:8px 14px;border-radius:999px}
  #p-menu{position:fixed;top:58px;left:12px;z-index:60;background:#fff;border-radius:16px;padding:10px;display:none;flex-direction:column;gap:2px;max-height:76vh;overflow:auto;box-shadow:0 12px 40px rgba(11,18,12,.18)}
  #p-menu.p-show{display:flex}
  #p-menu a{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:#0b120c;text-decoration:none;padding:7px 12px;border-radius:999px;white-space:nowrap}
  #p-menu a:hover{background:#ccff33}
  #p-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);background:#0b120c;color:#ccff33;font-family:"Archivo",ui-sans-serif,system-ui,sans-serif;font-size:13px;font-weight:700;padding:12px 20px;border-radius:999px;opacity:0;transition:all .3s cubic-bezier(.625,.05,0,1);z-index:70;pointer-events:none;max-width:86vw;text-align:center}
  #p-toast.p-show{opacity:1;transform:translateX(-50%) translateY(0)}
  .c-btn,.c-chip,.c-opt,.c-row,.c-lrow,.c-tab,.c-fab,.c-slot,.c-seg>span,.c-toggle,.c-pin,.c-bell,.c-avatar,.c-banner,.c-persona,.c-swatch,.c-input,.c-emblem,.c-tile--outline,.c-profile{cursor:pointer}
  @media (prefers-reduced-motion: reduce){.p-on .c-phone,.p-pulse{animation:none}}
"""

def prototipo(css_inline: bool) -> str:
    todas = "\n".join((BASE / "screens" / a).read_text() for _, _, arqs in GRUPOS for a in arqs if (BASE / "screens" / a).exists())
    css = f"<style>\n{CSS}\n{PROTO_CSS}\n</style>" if css_inline else f'<link rel="stylesheet" href="ds.css"><style>{PROTO_CSS}</style>'
    js = (BASE / "prototipo.js").read_text()
    ordem = [a for _, _, arqs in GRUPOS for a in arqs]
    itens = []
    for a in ordem:
        slug = re.search(r'id="(tela-[\w-]+)"', (BASE / "screens" / a).read_text())
        if slug: itens.append(f'<a href="#" data-go="{slug.group(1)}">{a.replace(".html","")}</a>')
    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CEROL · Protótipo Navegável</title>{css}</head>
<body class="ds">
{SPRITE}
<div id="p-hud">
  <button class="p-b" data-go-back="1" title="Voltar (Esc)">←</button>
  <button class="p-b" id="p-burger" title="Todas as telas">☰</button>
  <span id="p-nome"></span>
</div>
<nav id="p-menu">{''.join(itens)}</nav>
<div class="p-stage"><div id="p-wrap">
{todas}
</div></div>
<div id="p-toast"></div>
<script>
document.getElementById('p-burger').addEventListener('click',()=>document.getElementById('p-menu').classList.toggle('p-show'));
document.addEventListener('click',e=>{{if(!e.target.closest('#p-menu')&&!e.target.closest('#p-burger'))document.getElementById('p-menu').classList.remove('p-show')}});
{js}
document.querySelector('[data-go-back]').addEventListener('click',()=>document.dispatchEvent(new KeyboardEvent('keydown',{{key:'Escape'}})));
</script>
</body></html>"""

(BASE / "prototipo.html").write_text(prototipo(css_inline=False))
(BASE / "_publish-prototipo.html").write_text(inline_imgs(prototipo(css_inline=True)))

# 2. sincroniza sprite + embute css na versão de publicação da biblioteca
comp = (BASE / "components.html").read_text()
comp = re.sub(r"<!-- SPRITE:BEGIN -->.*?<!-- SPRITE:END -->", f"<!-- SPRITE:BEGIN -->\n{SPRITE}\n<!-- SPRITE:END -->", comp, flags=re.S)
(BASE / "components.html").write_text(comp)
pub = comp.replace('<link rel="stylesheet" href="ds.css">', f"<style>\n{CSS}\n</style>")
(BASE / "_publish-components.html").write_text(pub)

total = sum(len(arqs) for _, _, arqs in GRUPOS)
faltando = [a for _, _, arqs in GRUPOS for a in arqs if not (BASE / "screens" / a).exists()]
print("OK — telas.html gerado.", f"Faltando: {faltando}" if faltando else f"Todas as {total} telas presentes.")
