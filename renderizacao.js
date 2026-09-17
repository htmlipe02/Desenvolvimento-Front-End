const ROTULOS_FASE = {
  'a-fazer': 'A enfeitiçar',
  'em-andamento': 'Conjurando',
  'em-revisao': 'Em julgamento',
  'concluida': 'Consagrada',
};

const ROTULOS_PODER = {
  baixa: 'Poder menor',
  media: 'Poder médio',
  alta: 'Poder maior',
};

/**
 * @param {string} prazoISO
 * @returns {string}
 */
function formatarPrazo(prazoISO) {
  const data = new Date(prazoISO);
  if (Number.isNaN(data.getTime())) return prazoISO;

  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * @param {Object} tarefa
 * @returns {HTMLLIElement}
 */
function criarCartaoTarefa(tarefa) {
  const item = document.createElement('li');

  const cartao = document.createElement('article');
  cartao.className = 'cartao-tarefa';
  cartao.dataset.id = tarefa.id;

  const cabecalho = document.createElement('div');
  cabecalho.className = 'cartao-cabecalho';

  const titulo = document.createElement('h3');
  titulo.className = 'cartao-titulo';
  titulo.textContent = tarefa.titulo;

  const badgePoder = document.createElement('p');
  badgePoder.className = `badge-poder badge-poder--${tarefa.prioridade}`;
  badgePoder.textContent = ROTULOS_PODER[tarefa.prioridade] ?? tarefa.prioridade;

  cabecalho.append(titulo, badgePoder);

  const status = document.createElement('p');
  status.className = 'cartao-status';
  status.textContent = `Fase: ${ROTULOS_FASE[tarefa.status] ?? tarefa.status}`;

  const prazo = document.createElement('p');
  prazo.className = 'cartao-prazo';
  prazo.textContent = `Prazo: ${formatarPrazo(tarefa.prazo)}`;

  const selo = document.createElement('p');
  selo.className = 'cartao-selo';
  selo.textContent = `Selo do grimório: ${tarefa.id}`;

  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'botao-detalhes';
  botao.dataset.acao = 'ver-detalhes';
  botao.textContent = 'Ver detalhes do feitiço';

  cartao.append(cabecalho, status, prazo, selo, botao);
  item.appendChild(cartao);

  return item;
}

/**
 * @param {Array} tarefas
 * @param {HTMLElement} quadro
 */
export function renderizarTarefas(tarefas, quadro) {
  const listas = quadro.querySelectorAll('[data-lista-status]');

  listas.forEach((lista) => {
    const fase = lista.dataset.listaStatus;
    lista.textContent = '';

    const tarefasDaFase = tarefas.filter((tarefa) => tarefa.status === fase);

    if (tarefasDaFase.length === 0) {
      const vazio = document.createElement('li');
      vazio.className = 'lista-vazia';
      vazio.textContent = 'Nenhum feitiço nesta fase.';
      lista.appendChild(vazio);
      return;
    }

    tarefasDaFase.forEach((tarefa) => {
      lista.appendChild(criarCartaoTarefa(tarefa));
    });
  });
}
