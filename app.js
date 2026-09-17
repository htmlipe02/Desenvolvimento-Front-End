import { estado, restaurarFiltrosPadrao } from './estado.js';
import { carregarTarefas } from './api.js';
import { obterTarefasVisiveis } from './busca.js';
import { renderizarFeedback } from './estados.js';
import { renderizarTarefas } from './renderizacao.js';

const quadro = document.querySelector('main');

function renderizar() {
  const tarefasVisiveis = obterTarefasVisiveis(estado);

  renderizarTarefas(tarefasVisiveis, quadro);
  renderizarFeedback(estado, tarefasVisiveis.length);
}

function instalarEventosDoQuadro() {
  quadro.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-acao="ver-detalhes"]');
    if (!botao || !quadro.contains(botao)) return;

    const cartao = botao.closest('article');
    if (!cartao) return;

    const id = cartao.dataset.id;
    const tarefa = estado.tarefas.find((t) => String(t.id) === String(id));

    if (tarefa) {
      console.log(tarefa);
    }
  });
}

function instalarEventosDeFiltro() {
  const campoTitulo = document.querySelector('#titulo');
  const campoPrioridade = document.querySelector('#prioridade');
  const campoStatus = document.querySelector('#status');
  const campoOrdenacao = document.querySelector('#ordenacao');
  const botaoLimpar = document.querySelector('#limpar-filtros');
  const formulario = document.querySelector('main > form');

  campoTitulo.addEventListener('input', (evento) => {
    estado.busca = evento.target.value;
    renderizar();
  });

  campoPrioridade.addEventListener('change', (evento) => {
    estado.prioridade = evento.target.value;
    renderizar();
  });

  campoStatus.addEventListener('change', (evento) => {
    estado.status = evento.target.value;
    renderizar();
  });

  campoOrdenacao.addEventListener('change', (evento) => {
    estado.ordenacao = evento.target.value;
    renderizar();
  });

  botaoLimpar.addEventListener('click', () => {
    restaurarFiltrosPadrao();

    campoTitulo.value = '';
    campoPrioridade.value = estado.prioridade;
    campoStatus.value = estado.status;
    campoOrdenacao.value = estado.ordenacao;

    renderizar();
  });

  formulario?.addEventListener('submit', (evento) => evento.preventDefault());
}

async function inicializar() {
  instalarEventosDoQuadro();
  instalarEventosDeFiltro();

  const promessaCarregamento = carregarTarefas(estado);
  renderizar();

  await promessaCarregamento;
  renderizar();
}

inicializar();