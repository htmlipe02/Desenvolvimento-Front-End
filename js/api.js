/**
 * @param {Object} estado
 */
export async function carregarTarefas(estado) {
  estado.carregamento = true;
  estado.erro = null;

  try {
    const resposta = await fetch('./dados.json');

    if (!resposta.ok) {
      const erroProtocolo = new Error(`HTTP status: ${resposta.status}`);
      erroProtocolo.name = 'ErroProtocolo';
      throw erroProtocolo;
    }

    const dados = await resposta.json();
    estado.tarefas = dados.tarefas;
  } catch (erro) {
    estado.erro = erro.message;
    estado.tarefas = [];
  } finally {
    estado.carregamento = false;
  }
}