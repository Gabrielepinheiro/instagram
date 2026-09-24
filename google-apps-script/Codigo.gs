/**
 * Link na bio · recebe as respostas do site e grava nesta planilha.
 *
 * Como instalar: veja CONFIGURAR-PLANILHA.md no repositório.
 *  1. Rode a função `configurarPlanilha` uma vez (cria as abas e o painel).
 *  2. Implante como "App da Web" com acesso "Qualquer pessoa".
 *  3. Cole o endereço gerado em CONFIG.endpoint, no index.html.
 */

// Receber um e-mail a cada novo contato? (vai para a conta dona da planilha)
const AVISAR_POR_EMAIL = true;

const ABA_RESPOSTAS = "Respostas";
const ABA_CONTATOS = "Contatos";
const ABA_PAINEL = "Painel";

const COLUNAS_RESPOSTAS = [
  "Data e hora", "Data", "Semana", "ID", "Resultado", "Momento", "Ambientes",
  "Tipo de mudança", "O que quer resolver", "País", "Cidade", "Quando quer começar", "Origem",
];

const COLUNAS_CONTATOS = [
  "Data e hora", "ID", "Nome", "E-mail", "Celular", "País", "Cidade", "Resultado", "Momento",
  "Ambientes", "Tipo de mudança", "O que quer resolver", "Quando quer começar", "Consentimento", "Origem",
];

/* ============================================================
   RECEBIMENTO (chamado pelo site)
   ============================================================ */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.site) return resposta("ok"); // campo-armadilha preenchido: robô

    const agora = new Date();
    if (d.tipo === "diagnostico") {
      aba(ABA_RESPOSTAS, COLUNAS_RESPOSTAS).appendRow([
        agora, dia(agora), inicioDaSemana(agora), limpa(d.id), limpa(d.resultado), limpa(d.momento),
        limpa(d.ambientes), limpa(d.mudanca), limpa(d.objetivos), limpa(d.pais), limpa(d.cidade),
        limpa(d.inicio), limpa(d.origem),
      ]);
    } else if (d.tipo === "contato") {
      if (!d.nome || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(d.email || ""))) return resposta("invalido");
      aba(ABA_CONTATOS, COLUNAS_CONTATOS).appendRow([
        agora, limpa(d.id), limpa(d.nome), limpa(d.email), limpa(d.celular), limpa(d.pais), limpa(d.cidade),
        limpa(d.resultado), limpa(d.momento), limpa(d.ambientes), limpa(d.mudanca), limpa(d.objetivos),
        limpa(d.inicio), limpa(d.consentimento), limpa(d.origem),
      ]);
      if (AVISAR_POR_EMAIL) avisarPorEmail(d);
    }
    return resposta("ok");
  } catch (err) {
    console.error(err);
    return resposta("erro");
  } finally {
    lock.releaseLock();
  }
}

/* Abrir o endereço no navegador não mostra nenhum dado. */
function doGet() {
  return resposta("Este endereço só recebe respostas do site.");
}

function avisarPorEmail(d) {
  const para = Session.getEffectiveUser().getEmail();
  const linhas = [
    `Nome: ${d.nome}`,
    `E-mail: ${d.email}`,
    `Celular: ${d.celular}`,
    `Local: ${[d.cidade, d.pais].filter(String).join(", ")}`,
    "",
    `Resultado: ${d.resultado}`,
    `Momento: ${d.momento}`,
    `Ambientes: ${d.ambientes}`,
    `Tipo de mudança: ${d.mudanca}`,
    `O que quer resolver: ${d.objetivos}`,
    `Quando quer começar: ${d.inicio}`,
    "",
    `Planilha: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  ];
  MailApp.sendEmail({
    to: para,
    replyTo: String(d.email),
    subject: `Novo contato pelo link na bio: ${d.nome}`,
    body: linhas.join("\n"),
  });
}

/* ============================================================
   CONFIGURAÇÃO DA PLANILHA E DO PAINEL (rodar uma vez)
   ============================================================ */
function configurarPlanilha() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  aba(ABA_RESPOSTAS, COLUNAS_RESPOSTAS);
  aba(ABA_CONTATOS, COLUNAS_CONTATOS);

  ss.getSheetByName(ABA_RESPOSTAS).getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm");
  ss.getSheetByName(ABA_RESPOSTAS).getRange("B:C").setNumberFormat("dd/mm/yyyy");
  ss.getSheetByName(ABA_CONTATOS).getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm");

  let painel = ss.getSheetByName(ABA_PAINEL);
  if (painel) ss.deleteSheet(painel);
  painel = ss.insertSheet(ABA_PAINEL, 0);
  painel.setHiddenGridlines(true);

  const marrom = "#4A3428";
  const bordo = "#7B1E2B";
  const suave = "#F6E9EA";

  painel.getRange("A1").setValue("Painel do link na bio").setFontSize(18).setFontWeight("bold").setFontColor(marrom);
  painel.getRange("A2").setValue("Atualiza sozinho a cada nova resposta.").setFontColor("#7D6557");

  // Números principais
  const numeros = [
    ["Diagnósticos respondidos", `=COUNTA(${ABA_RESPOSTAS}!D2:D)`],
    ["Nos últimos 7 dias", `=COUNTIF(${ABA_RESPOSTAS}!B2:B,">="&(TODAY()-6))`],
    ["Nos últimos 30 dias", `=COUNTIF(${ABA_RESPOSTAS}!B2:B,">="&(TODAY()-29))`],
    ["Contatos recebidos", `=COUNTA(${ABA_CONTATOS}!B2:B)`],
    ["Contatos nos últimos 30 dias", `=COUNTIF(${ABA_CONTATOS}!A2:A,">="&(TODAY()-29))`],
    ["Respostas que viraram contato", `=IFERROR(B8/B5,0)`],
  ];
  painel.getRange("A4").setValue("Resumo").setFontWeight("bold").setFontColor(bordo);
  numeros.forEach(([rotulo, formula], i) => {
    painel.getRange(5 + i, 1).setValue(rotulo).setFontColor(marrom);
    painel.getRange(5 + i, 2).setFormula(formula).setFontWeight("bold").setFontColor(bordo).setHorizontalAlignment("right");
  });
  painel.getRange("B10").setNumberFormat("0%");
  painel.getRange("A5:B10").setBackground(suave);

  // Tabelas de frequência, abaixo dos gráficos (cada uma ocupa duas ou três colunas)
  const tabelas = [
    { celula: "A40", titulo: "Respostas por semana",
      formula: `=QUERY(${ABA_RESPOSTAS}!C2:C,"select C, count(C) where C is not null group by C order by C label C 'Semana (início)', count(C) 'Respostas'",0)` },
    { celula: "D40", titulo: "Por país",
      formula: `=QUERY(${ABA_RESPOSTAS}!J2:J,"select J, count(J) where J <> '' group by J order by count(J) desc label J 'País', count(J) 'Respostas'",0)` },
    { celula: "G40", titulo: "Cidades com mais respostas",
      formula: `=QUERY(${ABA_RESPOSTAS}!J2:K,"select K, J, count(K) where K <> '' group by K, J order by count(K) desc limit 15 label K 'Cidade', J 'País', count(K) 'Respostas'",0)` },
    { celula: "K40", titulo: "Por resultado",
      formula: `=QUERY(${ABA_RESPOSTAS}!E2:E,"select E, count(E) where E <> '' group by E order by count(E) desc label E 'Resultado', count(E) 'Respostas'",0)` },
    { celula: "N40", titulo: "Por momento da casa",
      formula: `=QUERY(${ABA_RESPOSTAS}!F2:F,"select F, count(F) where F <> '' group by F order by count(F) desc label F 'Momento', count(F) 'Respostas'",0)` },
    { celula: "Q40", titulo: "Origem das visitas",
      formula: `=QUERY(${ABA_RESPOSTAS}!M2:M,"select M, count(M) where M <> '' group by M order by count(M) desc label M 'Origem', count(M) 'Respostas'",0)` },
  ];
  tabelas.forEach(({ celula, titulo, formula }) => {
    const r = painel.getRange(celula);
    r.setValue(titulo).setFontWeight("bold").setFontColor(bordo);
    r.offset(1, 0).setFormula(formula);
  });
  painel.getRange("A42:A120").setNumberFormat("dd/mm/yyyy");

  // Últimos contatos (ao lado do resumo)
  painel.getRange("D4").setValue("Últimos contatos").setFontWeight("bold").setFontColor(bordo);
  painel.getRange("D5").setFormula(
    `=IFERROR(QUERY(${ABA_CONTATOS}!A2:G,"select A, C, D, E, G, F where C <> '' order by A desc limit 15 label A 'Data', C 'Nome', D 'E-mail', E 'Celular', G 'Cidade', F 'País'",0),"Nenhum contato ainda")`
  );
  painel.getRange("D6:D20").setNumberFormat("dd/mm/yyyy hh:mm");

  // Gráficos
  painel.insertChart(painel.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(painel.getRange("A41:B120"))
    .setPosition(23, 1, 0, 0)
    .setOption("title", "Respostas por semana")
    .setOption("legend", { position: "none" })
    .setOption("colors", [bordo])
    .setOption("width", 520).setOption("height", 300)
    .build());
  painel.insertChart(painel.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(painel.getRange("D41:E60"))
    .setPosition(23, 6, 0, 0)
    .setOption("title", "Respostas por país")
    .setOption("legend", { position: "none" })
    .setOption("colors", [bordo])
    .setOption("width", 520).setOption("height", 300)
    .build());

  painel.setColumnWidth(1, 220);
  painel.autoResizeColumns(2, 19);
  ss.setActiveSheet(painel);
  SpreadsheetApp.flush();
}

/* ============================================================
   AUXILIARES
   ============================================================ */
function aba(nome, colunas) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(nome);
  if (!sh) sh = ss.insertSheet(nome);
  if (sh.getLastRow() === 0) {
    sh.appendRow(colunas);
    sh.getRange(1, 1, 1, colunas.length).setFontWeight("bold").setBackground("#F6E9EA").setFontColor("#4A3428");
    sh.setFrozenRows(1);
  }
  return sh;
}

/* Corta textos longos e impede que um texto vire fórmula na planilha. */
function limpa(v) {
  const t = String(v == null ? "" : v).slice(0, 500);
  return /^[=+\-@]/.test(t) ? `'${t}` : t;
}

function dia(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* Segunda-feira da semana da data. */
function inicioDaSemana(d) {
  const x = dia(d);
  const diaSemana = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - diaSemana);
  return x;
}

function resposta(texto) {
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.TEXT);
}
