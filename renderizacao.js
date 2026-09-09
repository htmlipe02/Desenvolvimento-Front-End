// js/renderizacao.js
// -----------------------------------------------------------------------------
// Parte A (dados e renderização) + Parte B (marcação do botão de ação).
// Responsável apenas por transformar dados em elementos de DOM. Não conhece
// listeners nem a lógica de composição — isso fica em app.js.
// -----------------------------------------------------------------------------

/**
 * Cria o <article> de uma tarefa.
 *
 * Regras aplicadas:
 * - Usa apenas createElement/textContent (nunca innerHTML), atendendo ao
 *   critério de pronto "Dados entram por textContent, não innerHTML".
 * - Mantém a ordem semântica esperada pelo styles.css (h3, depois 4 <p>,
 *   nessa ordem: Projeto, Responsável, Prazo, Prioridade), pois o CSS usa
 *   seletores article p:nth-of-type(n) para estilizar cada informação
 *   (ex.: a Prioridade vira "badge" via p:nth-of-type(4)).
 * - Grava o id da tarefa em data-id no próprio <article>. É esse dado que
 *   permite, no clique, voltar do elemento de tela até o objeto original
 *   (Slide "Fluxo completo: do dado ao dado identificado").
 */
export function criarCartao(tarefa) {
  const artigo = document.createElement('article');
  artigo.dataset.id = tarefa.id;

  const titulo = document.createElement('h3');
  titulo.textContent = tarefa.titulo;

  const projeto = document.createElement('p');
  projeto.textContent = `Projeto: ${tarefa.projeto}`;

  const responsavel = document.createElement('p');
  responsavel.textContent = `Responsável: ${tarefa.responsavel}`;

  const prazo = document.createElement('p');
  prazo.textContent = `Prazo: ${tarefa.prazo}`;

  const prioridade = document.createElement('p');
  prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

  // Parte B: botão de ação delegada. type="button" evita submit acidental
  // caso o cartão algum dia fique dentro de um <form>.
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.dataset.acao = 'ver-detalhes';

  const rotulo = document.createElement('span');
  rotulo.textContent = 'Ver detalhes';
  botao.appendChild(rotulo);

  artigo.append(titulo, projeto, responsavel, prazo, prioridade, botao);
  return artigo;
}

/**
 * Renderiza todas as tarefas dentro do quadro.
 *
 * "quadro" é o elemento que contém as 4 listas de status (no projeto atual,
 * o <main>). A função procura dentro dele todo elemento marcado com o
 * atributo [data-lista-status] e, para cada um, filtra as tarefas daquele
 * status, cria os cartões e substitui o conteúdo com replaceChildren.
 *
 * Usar replaceChildren (em vez de innerHTML += ou appendChild sucessivos)
 * garante que uma segunda chamada não duplique cartões antigos — critério de
 * pronto "Segunda renderização não duplica".
 */
export function renderizarTarefas(tarefas, quadro) {
  const listas = quadro.querySelectorAll('[data-lista-status]');

  listas.forEach((lista) => {
    const status = lista.dataset.listaStatus;
    const tarefasDoStatus = tarefas.filter((tarefa) => tarefa.status === status);

    if (tarefasDoStatus.length === 0) {
      const item = document.createElement('li');
      const mensagem = document.createElement('p');
      mensagem.textContent = 'Nenhuma tarefa nesta coluna.';
      item.appendChild(mensagem);
      lista.replaceChildren(item);
      return;
    }

    const itens = tarefasDoStatus.map((tarefa) => {
      const item = document.createElement('li');
      item.appendChild(criarCartao(tarefa));
      return item;
    });

    lista.replaceChildren(...itens);
  });
}
