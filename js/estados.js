import { renderizarTarefas } from './renderizacao.js';

/**
 * @param {'carregando'|'sucesso'|'vazio'|'erro'} estado
 * @param {HTMLElement} quadro
 * @param {Array|string|null} dados
 */
export function renderizarEstado(estado, quadro, dados = null) {
  const statusRegiao = document.getElementById('status-regiao');
  if (!statusRegiao || !quadro) return;

  if (estado === 'carregando') {
    statusRegiao.textContent = 'Carregando tarefas...';
  } else if (estado === 'sucesso') {
    const total = dados ? dados.length : 0;
    statusRegiao.textContent = `${total} tarefas carregadas com sucesso.`;
    renderizarTarefas(dados, quadro);
  } else if (estado === 'vazio') {
    statusRegiao.textContent = 'Nenhuma tarefa encontrada no sistema.';
    renderizarTarefas([], quadro);
  } else if (estado === 'erro') {
    statusRegiao.textContent = `Erro ao carregar o quadro: ${dados}`;
    
  }

}