# Link na bio · Gabriele Pinheiro

Página de link na bio para projetos de interiores online na Europa. Em vez de uma
lista de botões, a visitante responde algumas perguntas rápidas sobre o momento
da casa dela, e a página mostra qual pode ser o próximo passo.

## Arquivos

- `index.html`: a página inteira (HTML, CSS e JavaScript, sem servidor).
- `fontes/`: a fonte Poppins hospedada junto com o site.
- `google-apps-script/Codigo.gs`: script que grava as respostas na planilha e monta o painel.
- `CONFIGURAR-PLANILHA.md`: passo a passo para ligar a planilha.

## Como funciona

Seis perguntas: momento da casa, quantos ambientes, tipo de mudança, o que o
projeto deve resolver (múltipla escolha), país e cidade e quando quer começar.

Há três resultados possíveis:

| Situação | Resultado |
|---|---|
| "Ainda estou pesquisando" (pula as outras perguntas) | Convite para acompanhar projetos e Instagram |
| "Estou planejando uma reforma maior" | Explica o foco em interiores + formulário de contato |
| Todos os outros casos | "Seu projeto parece combinar com a forma como eu trabalho" + formulário de contato |

## Como personalizar

No `<script>` do `index.html`:

- `CONFIG`: nome, iniciais, foto, bio, CAU, endereço da planilha (`endpoint`),
  e-mail de privacidade, contatos, portfólio e depoimento.
  Campo vazio (`""`) esconde o botão correspondente.
- `PAISES`: lista de países da pergunta de local.
- `PERGUNTAS`, `perfil()` e `TRECHOS`: textos das perguntas, regra do resultado
  e trechos da frase personalizada.

### Respostas, contatos e painel

Quem chega ao resultado "dentro do escopo" ou "reforma maior" pode deixar nome,
e-mail e celular (com código do país), com autorização de contato e aviso de
privacidade. Tudo vai para uma Planilha Google privada, com uma aba de painel
(frequência por semana, países, cidades, resultado e últimos contatos) e um
e-mail de aviso a cada novo contato.

Passo a passo em [CONFIGURAR-PLANILHA.md](CONFIGURAR-PLANILHA.md). Enquanto
`CONFIG.endpoint` estiver vazio, o formulário funciona em modo de demonstração
e nada é salvo.

O WhatsApp ainda não foi definido. Quando `CONFIG.whatsapp` for preenchido,
aparece um botão de WhatsApp na tela de agradecimento.

## Como publicar (GitHub Pages, grátis)

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`,
   pasta `/ (root)` e salve.
3. Em 1 ou 2 minutos o endereço aparece no topo da mesma tela
   (algo como `https://gabrielepinheiro.github.io/instagram/`).
4. Cole esse endereço no campo de link da bio do Instagram.

Para usar um endereço próprio (ex.: `link.seudominio.com.br`), preencha
**Custom domain** na mesma tela e crie o registro CNAME no seu provedor de domínio.
