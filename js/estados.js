/**
 * @param {Object} estado
 * @param {number} totalVisivel
 */
export function renderizarFeedback(estado, totalVisivel) {
  const regiaoStatus = document.getElementById('status-regiao');
  if (!regiaoStatus) return;

  const totalOriginal = estado.tarefas.length;

  if (estado.carregamento) {
    regiaoStatus.textContent = 'Carregando tarefas...';
    return;
  }

  if (estado.erro !== null) {
    regiaoStatus.textContent = `Erro ao carregar o quadro: ${estado.erro}`;
    return;
  }

  if (totalOriginal === 0) {
    regiaoStatus.textContent = 'Nenhuma tarefa encontrada no sistema.';
    return;
  }

  if (totalVisivel === 0) {
    regiaoStatus.textContent = 'Nenhuma tarefa corresponde aos filtros aplicados. Tente limpar os filtros.';
    return;
  }

  regiaoStatus.textContent = `${totalVisivel} de ${totalOriginal} tarefas`;
}