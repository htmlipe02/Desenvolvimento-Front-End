export function criarCartao(tarefa) {
  const artigo = document.createElement('article');
  artigo.dataset.id = tarefa.id;

  const titulo = document.createElement('h3');
  titulo.textContent = tarefa.titulo;

  const projeto = document.createElement('p');
  projeto.textContent = `Projeto: ${tarefa.projeto ?? '—'}`;

  const responsavel = document.createElement('p');
  responsavel.textContent = `Responsável: ${tarefa.responsavel ?? '—'}`;

  const prazo = document.createElement('p');
  prazo.textContent = `Prazo: ${tarefa.prazo}`;

  const prioridade = document.createElement('p');
  prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

  const botao = document.createElement('button');
  botao.type = 'button';
  botao.dataset.acao = 'ver-detalhes';

  const rotulo = document.createElement('span');
  rotulo.textContent = 'Ver detalhes';
  botao.appendChild(rotulo);

  artigo.append(titulo, projeto, responsavel, prazo, prioridade, botao);
  return artigo;
}

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