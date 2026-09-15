export const estado = {
  tarefas: [],
  busca: '',
  status: 'todos',
  prioridade: 'todas',
  ordenacao: 'prazo',
  carregamento: false,
  erro: null,
};

export function restaurarFiltrosPadrao() {
  estado.busca = '';
  estado.status = 'todos';
  estado.prioridade = 'todas';
  estado.ordenacao = 'prazo';
}
