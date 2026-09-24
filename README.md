# Link na bio · Diagnóstico do Espaço

Página de link na bio para arquitetura de interiores e consultoria. Em vez de uma
lista de botões, a visitante responde 4 perguntas rápidas e recebe a indicação do
serviço certo para o momento dela, com o motivo, o que está incluído e o próximo
passo.

## Arquivos

- `index.html`: a página inteira (HTML, CSS e JavaScript, sem servidor).
- `fontes/`: a fonte Poppins hospedada junto com o site.

## Como personalizar

No `<script>` do `index.html`:

- `CONFIG`: nome, iniciais, foto, bio, cidade, CAU, contatos e links.
  Campo vazio (`""`) esconde o botão correspondente.
- `SERVICOS`: nome, descrição, itens incluídos, prazo, investimento e texto do botão.
- `PERGUNTAS` e `indicar()`: as perguntas e a regra que escolhe a indicação.

### Contato

O WhatsApp ainda **não** está definido. Enquanto `whatsapp` e `instagram`
estiverem vazios, o botão final vira "Copiar meu diagnóstico": copia o resumo das
respostas para a pessoa enviar. Quando o número for preenchido, o botão passa a
abrir o WhatsApp com essa mensagem já escrita.

## Como publicar (GitHub Pages, grátis)

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`,
   pasta `/ (root)` e salve.
3. Em 1 ou 2 minutos o endereço aparece no topo da mesma tela
   (algo como `https://gabrielepinheiro.github.io/instagram/`).
4. Cole esse endereço no campo de link da bio do Instagram.

Para usar um endereço próprio (ex.: `link.seudominio.com.br`), preencha
**Custom domain** na mesma tela e crie o registro CNAME no seu provedor de domínio.
