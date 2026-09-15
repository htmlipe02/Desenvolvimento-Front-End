/**
 * @param {Object} estado
 * @param {Array}  estado.tarefas
 * @param {string} estado.busca
 * @param {string} estado.status
 * @param {string} estado.prioridade
 * @param {string} estado.ordenacao
 * @returns {Array}
 */
export function obterTarefasVisiveis(estado) {
  const tituloBusca = estado.busca.trim().toLowerCase();

  const tarefasFiltradas = estado.tarefas.filter((tarefa) => {
    const bateTitulo = !tituloBusca || tarefa.titulo.toLowerCase().includes(tituloBusca);
    const bateStatus = estado.status === 'todos' || tarefa.status === estado.status;
    const batePrioridade = estado.prioridade === 'todas' || tarefa.prioridade === estado.prioridade;

    return bateTitulo && bateStatus && batePrioridade;
  });

  const tarefasOrdenadas = [...tarefasFiltradas].sort((tarefaA, tarefaB) => {
    const prazoA = new Date(tarefaA.prazo);
    const prazoB = new Date(tarefaB.prazo);

    return estado.ordenacao === 'prazo-desc' ? prazoB - prazoA : prazoA - prazoB;
  });

  return tarefasOrdenadas;
}