
import { carregarTarefas } from './api.js';
import { filtrarTarefas } from './busca.js';
import { renderizarEstado } from './estados.js';
import { renderizarTarefas } from './renderizacao.js';


const quadro = document.querySelector('main');


let tarefas = [];

function instalarEventosDoQuadro(quadro) {
  quadro.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-acao="ver-detalhes"]');


    if (!botao || !quadro.contains(botao)) return;

    const cartao = botao.closest('article');
    if (!cartao) return;

    const id = cartao.dataset.id;
    const tarefa = tarefas.find((t) => String(t.id) === String(id));


    if (tarefa) {
      console.log(tarefa);
    }
  });
}


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

    const titulo = document.querySelector('#titulo').value;
    const statusSelecionado = document.querySelector('#status').value;
    const status = mapaStatusSelect[statusSelecionado] ?? statusSelecionado;
    const prioridade = document.querySelector('#prioridade').value;

    const tarefasFiltradas = filtrarTarefas(tarefas, { titulo, prioridade, status });

    renderizarTarefas(tarefasFiltradas, quadro);
  });
}

async function inicializar() {
  instalarEventosDoQuadro(quadro);
  instalarFiltro(quadro);

  renderizarEstado('carregando', quadro);

  try {
    tarefas = await carregarTarefas();

    if (tarefas.length === 0) {
      renderizarEstado('vazio', quadro);
    } else {
      renderizarEstado('sucesso', quadro, tarefas);
    }
  } catch (erro) {
    renderizarEstado('erro', quadro, erro.message);
  }

  window.tarefas = tarefas;
  window.quadro = quadro;
  window.renderizarTarefas = renderizarTarefas;
}


inicializar();