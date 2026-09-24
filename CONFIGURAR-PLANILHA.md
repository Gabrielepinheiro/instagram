# Configurar a planilha e o painel

O site guarda as respostas numa **Planilha Google na sua conta**. Só quem tem
acesso à planilha vê os dados. Por padrão, só você.

Leva uns 10 minutos, e é feito uma vez só.

## 1. Criar a planilha

1. Entre em [sheets.new](https://sheets.new) com a sua conta Google.
2. Dê um nome, por exemplo **Link na bio · respostas**.

## 2. Colar o script

1. Na planilha, abra **Extensões → Apps Script**.
2. Apague o conteúdo que aparece e cole o arquivo
   [`google-apps-script/Codigo.gs`](google-apps-script/Codigo.gs) inteiro.
3. Clique em **Salvar** (ícone de disquete).
4. Opcional: em **Configurações do projeto** (engrenagem), ajuste o **fuso
   horário** para o seu (ex.: Europe/Lisbon).

## 3. Montar as abas e o painel

1. No topo do editor, escolha a função **configurarPlanilha** e clique em **Executar**.
2. O Google pede autorização. Clique em **Revisar permissões**, escolha sua conta,
   depois **Avançado → Acessar (não seguro)** e **Permitir**. O aviso aparece
   porque o script é seu e não foi publicado na loja do Google. Ele só mexe nesta
   planilha e envia e-mails para você.
3. Volte para a planilha: vão aparecer as abas **Painel**, **Respostas** e **Contatos**.

## 4. Publicar o endereço que recebe as respostas

1. No editor do Apps Script, clique em **Implantar → Nova implantação**.
2. Em **Selecionar tipo**, escolha **App da Web**.
3. Preencha:
   - **Executar como:** Eu
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar** e copie o **URL do app da Web** (termina em `/exec`).

"Qualquer pessoa" significa que qualquer visitante do site consegue **enviar**
respostas. Ninguém consegue **ler** nada por esse endereço: abrir o link no
navegador só mostra uma frase. Os dados continuam visíveis apenas na planilha.

## 5. Ligar o site à planilha

No `index.html`, dentro de `CONFIG`, cole o endereço:

```js
endpoint: "https://script.google.com/macros/s/.../exec",
```

Aproveite e preencha `emailPrivacidade` com o e-mail que você quer mostrar no
aviso de privacidade.

## Pronto

- **Painel:** frequência por semana, países, cidades, resultado, momento da casa,
  origem das visitas e os últimos contatos, com gráficos.
- **Respostas:** uma linha por pessoa que chegou ao resultado, sem dados pessoais.
- **Contatos:** uma linha por pessoa que deixou nome, e-mail e celular.
- **E-mail:** a cada novo contato você recebe um e-mail com as respostas. Dá para
  responder direto, porque o "responder para" já vem com o e-mail da cliente.
  Para desligar, mude `AVISAR_POR_EMAIL` para `false` no script.

Dica: use o link com `?utm_source=instagram` na bio (ex.:
`https://seu-endereco/?utm_source=instagram`). Assim o painel mostra de onde as
pessoas vieram.

### Se mudar o script depois

Depois de editar o `Codigo.gs`, vá em **Implantar → Gerenciar implantações →
editar (lápis) → Versão: Nova versão → Implantar**. O endereço continua o mesmo.

### Privacidade (RGPD)

O formulário só envia os dados com a caixa de autorização marcada, e explica
como eles são usados. Nunca compartilhe a planilha com permissão de acesso
público. Se alguém pedir para apagar os dados, é só excluir a linha na aba
**Contatos**.
