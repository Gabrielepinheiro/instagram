# Link na bio · Gabriele Pinheiro

Página de link na bio para projetos de interiores online na Europa. Em vez de uma
lista de botões, a visitante responde algumas perguntas rápidas sobre o momento
da casa dela, e a página mostra qual pode ser o próximo passo.

## Arquivos

- `index.html`: a página inteira (HTML, CSS e JavaScript, sem servidor).
- `fontes/`: a fonte Poppins hospedada junto com o site.

## Como funciona

Seis perguntas: momento da casa, quantos ambientes, tipo de mudança, o que o
projeto deve resolver (múltipla escolha), país e cidade e quando quer começar.

Há três resultados possíveis:

| Situação | Resultado |
|---|---|
| "Ainda estou pesquisando" (pula as outras perguntas) | Convite para acompanhar projetos e Instagram |
| "Estou planejando uma reforma maior" | Explica o foco em interiores e abre a conversa |
| Todos os outros casos | "Seu projeto parece combinar com a forma como eu trabalho" + conversa |

## Como personalizar

No `<script>` do `index.html`:

- `CONFIG`: nome, iniciais, foto, bio, CAU, contatos, portfólio e depoimento.
  Campo vazio (`""`) esconde o botão correspondente.
- `PAISES`: lista de países da pergunta de local.
- `PERGUNTAS`, `perfil()` e `TRECHOS`: textos das perguntas, regra do resultado
  e trechos da frase personalizada.

### Contato

O WhatsApp ainda **não** está definido. Enquanto `whatsapp` e `instagram`
estiverem vazios, o botão de conversa copia o resumo das respostas para a
pessoa enviar. Quando o número for preenchido, o botão passa a abrir o WhatsApp
com esse resumo já escrito.

## Como publicar (GitHub Pages, grátis)

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`,
   pasta `/ (root)` e salve.
3. Em 1 ou 2 minutos o endereço aparece no topo da mesma tela
   (algo como `https://gabrielepinheiro.github.io/instagram/`).
4. Cole esse endereço no campo de link da bio do Instagram.

Para usar um endereço próprio (ex.: `link.seudominio.com.br`), preencha
**Custom domain** na mesma tela e crie o registro CNAME no seu provedor de domínio.
