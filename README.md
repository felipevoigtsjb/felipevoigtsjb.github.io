# portifolio-FC

Site da **FC Soluções Tecnológicas**: [fcsolucoes.me](https://fcsolucoes.me)

Site estático (HTML, CSS e JavaScript puros, sem build), hospedado no GitHub Pages.

```
index.html    página única com todas as seções
styles.css    estilos (cores no topo, em :root)
script.js     animações de rolagem e formulário via WhatsApp
favicon.svg   ícone da aba
CNAME         domínio personalizado (fcsolucoes.me)
.nojekyll     faz o GitHub Pages servir os arquivos como estão
assets/       imagens e vídeos (prints, showreel, foto)
```

## Ver localmente

Abra o `index.html` no navegador. Se preferir um servidor local:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Antes de publicar: preencher os campos

Procure por `[` no `index.html` e no `script.js`. Faltam:

- **Contatos**: número do WhatsApp (no `index.html` e na variável `WHATSAPP` do `script.js`, só dígitos, ex.: `5548999999999`), e-mail, Instagram, LinkedIn, GitHub
- **CNPJ** no rodapé
- **Números**: anos de experiência e projetos entregues
- **Tecnologias** na seção Tecnologia
- **Textos**: frase de resultado da Verbo Vivo, sua trajetória, prazo de resposta
- **Imagens**: prints dos cases, sua foto e o showreel (veja abaixo)

### Encaixar imagens e vídeo

Coloque os arquivos em `assets/` e troque o texto do espaço reservado pela imagem.

Print de um case, dentro de `<div class="case__img">`:

```html
<div class="case__img"><img src="assets/gestify.jpg" alt="Tela do Gestify" loading="lazy"></div>
```

Foto, dentro de `<div class="about__photo">`:

```html
<div class="about__photo rv"><img src="assets/felipe.jpg" alt="Felipe Voigt Martins"></div>
```

Showreel: dentro de `<div class="reel">`, apague o botão de play e o texto, e use:

```html
<video src="assets/showreel.mp4" autoplay muted loop playsinline></video>
```

Dica: mantenha o vídeo leve (até uns 8 MB, 1080p, H.264). O GitHub recusa arquivos acima de 100 MB.

## Publicar no GitHub Pages

1. Crie o repositório `portifolio-FC` no GitHub (público, para o Pages gratuito).
2. Nesta pasta:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portifolio-FC.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`. Salve.
4. Ainda em **Settings → Pages**, em **Custom domain**, confirme `fcsolucoes.me` (o arquivo `CNAME` já preenche isso).

## Apontar o domínio na Namecheap

Em **Domain List → fcsolucoes.me → Manage → Advanced DNS**:

1. Apague os registros padrão de estacionamento (o *URL Redirect* e o CNAME `www` para `parkingpage.namecheap.com`).
2. Crie estes registros:

| Tipo | Host | Valor |
|------|------|-------|
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |
| CNAME Record | `www` | `SEU_USUARIO.github.io.` |

3. Espere a propagação (de minutos a algumas horas). Quando o GitHub reconhecer o domínio, marque **Enforce HTTPS** em Settings → Pages.

Confira os IPs atuais na documentação do GitHub, em "Managing a custom domain for your GitHub Pages site", caso tenham mudado.

## Personalizar

- **Cor de destaque**: troque `--accent` no topo do `styles.css` (e `--glow` / `--spot`, que são a mesma cor com transparência).
- **Animações**: quem ativa "reduzir movimento" no sistema recebe o site sem animações automaticamente.
