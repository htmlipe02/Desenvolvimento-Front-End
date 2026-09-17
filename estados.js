/**
 * @param {Object} estado
 * @param {number} totalVisivel
 */
export function renderizarFeedback(estado, totalVisivel) {
  const regiaoStatus = document.getElementById('status-regiao');
  if (!regiaoStatus) return;

  const totalOriginal = estado.tarefas.length;

  if (estado.carregamento) {
    regiaoStatus.textContent = 'Invocando os feitiços do grimório...';
    return;
  }

  if (estado.erro !== null) {
    regiaoStatus.textContent = `O feitiço de carregamento falhou: ${estado.erro}`;
    return;
  }

  if (totalOriginal === 0) {
    regiaoStatus.textContent = 'O grimório está vazio. Nenhum feitiço foi registrado ainda.';
    return;
  }

  if (totalVisivel === 0) {
    regiaoStatus.textContent = 'Nenhum feitiço corresponde ao círculo de busca. Tente desfazê-lo.';
    return;
  }

  regiaoStatus.textContent = `${totalVisivel} de ${totalOriginal} feitiços no grimório`;
}
