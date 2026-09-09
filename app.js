// app.js
// -----------------------------------------------------------------------------
// Parte C: composição dos módulos. Único arquivo carregado pelo HTML
// (<script type="module" src="./app.js">). Importa dados e renderização,
// inicializa a tela e instala a delegação de eventos (Parte B).
// -----------------------------------------------------------------------------
import { tarefas } from './dados.js';
import { renderizarTarefas } from './renderizacao.js';

// "quadro" = elemento que engloba as 4 colunas (main). É o mesmo objeto usado
// tanto para renderizar quanto para instalar o listener delegado.
const quadro = document.querySelector('main');

/**
 * Parte B - ação delegada.
 * Um único listener de click no quadro atende a todos os cartões, inclusive
 * os que forem criados depois (nova renderização), porque o listener não é
 * preso a nenhum elemento específico de cartão.
 *
 * Caminho do evento: target do clique -> closest até o botão de ação
 * (data-acao="ver-detalhes") -> closest até o <article> (o cartão) ->
 * dataset.id -> Array.find no array de tarefas -> objeto completo da tarefa.
 */
function instalarEventosDoQuadro(quadro) {
  quadro.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-acao="ver-detalhes"]');

    // Garante que o clique realmente partiu de um botão de ação dentro do
    // próprio quadro (limite do quadro), ignorando cliques em outras áreas
    // (ex.: no formulário de filtros).
    if (!botao || !quadro.contains(botao)) return;

    const cartao = botao.closest('article');
    if (!cartao) return;

    const id = cartao.dataset.id;
    const tarefa = tarefas.find((t) => String(t.id) === String(id));

    // Único ponto de saída em DevTools > Console, conforme critério de pronto.
    if (tarefa) {
      console.log(tarefa);
    }
  });
}

/**
 * Extra (não pedido explicitamente nos slides desta aula, mas atende à
 * orientação geral de tratar formulários com preventDefault): o formulário
 * de filtros já existe no HTML herdado de aulas anteriores. Aqui ele apenas
 * filtra o array local e reaproveita renderizarTarefas — sem nenhuma
 * requisição nem novo estado global.
 *
 * Observação: os <option> de status no HTML usam valores sem hífen
 * (ex.: "afazer"), enquanto o modelo de dados desta aula usa valores com
 * hífen (ex.: "a-fazer"), conforme pedido no slide "Parte A". O mapa abaixo
 * converte um formato para o outro. O ideal é alinhar os values do <select>
 * (ver observações de inconsistência ao final da resposta).
 */
const mapaStatusSelect = {
  afazer: 'a-fazer',
  emandamento: 'em-andamento',
  emrevisao: 'em-revisao',
  concluida: 'concluida',
};

function instalarFiltro(quadro) {
  const formulario = document.querySelector('main > form');
  if (!formulario) return;

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tituloBusca = document.querySelector('#titulo').value.trim().toLowerCase();
    const statusSelecionado = document.querySelector('#status').value;
    const statusFiltro = mapaStatusSelect[statusSelecionado] ?? statusSelecionado;

    const prioridadeSelecionada = document.querySelector('#prioridade').value;  // ✅ Pega o valor do select

    const tarefasFiltradas = tarefas.filter((tarefa) => {
      const bateTitulo = tituloBusca === '' || tarefa.titulo.toLowerCase().includes(tituloBusca);
      const bateStatus = statusFiltro === '' || tarefa.status === statusFiltro;
      const batePropriedade = prioridadeSelecionada === '' || tarefa.prioridade.toLowerCase() === prioridadeSelecionada.toLowerCase();  // ✅ Filtra por prioridade
      return bateTitulo && bateStatus && batePropriedade;
    });

    renderizarTarefas(tarefasFiltradas, quadro);
  });
}

function inicializar() {
  renderizarTarefas(tarefas, quadro);
  instalarEventosDoQuadro(quadro);
  instalarFiltro(quadro);

  // Exposto apenas para o diagnóstico manual pedido nos slides (Parte B item 4
  // e "Diagnóstico coletivo"): permite, direto no DevTools > Console, rodar
  // `renderizarTarefas(tarefas, quadro)` de novo, ou `tarefas.push({...})`
  // seguido de nova renderização, para conferir que não há duplicação.
  window.tarefas = tarefas;
  window.quadro = quadro;
  window.renderizarTarefas = renderizarTarefas;
}

inicializar();
