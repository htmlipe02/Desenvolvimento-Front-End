/**
 *
 *
 * @param {Array} tarefas
 * @param {Object} opcoes
 * @param {string} [opcoes.titulo]
 * @param {string} [opcoes.prioridade]
 * @param {string} [opcoes.status]
 * @param {string} [opcoes.ordemPrazo]
 */
export function filtrarTarefas(tarefas, { titulo = '', prioridade = '', status = '', ordemPrazo = '' }) {
  const tituloBusca = titulo.trim().toLowerCase();

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const bateTitulo = !tituloBusca || tarefa.titulo.toLowerCase().includes(tituloBusca);
    const batePrioridade = !prioridade || tarefa.prioridade.toLowerCase() === prioridade.toLowerCase();
    const bateStatus = !status || tarefa.status === status;

    return bateTitulo && batePrioridade && bateStatus;
  });

  if (!ordemPrazo) {
    return tarefasFiltradas;
  }

  return [...tarefasFiltradas].sort((tarefaA, tarefaB) => {
    const prazoA = new Date(tarefaA.prazo);
    const prazoB = new Date(tarefaB.prazo);

    if (ordemPrazo === 'crescente') return prazoA - prazoB;
    if (ordemPrazo === 'decrescente') return prazoB - prazoA;
    return 0;
    
  });

}