// js/dados.js
// -----------------------------------------------------------------------------
// Fonte única de dados da aplicação.
// Slide "Fluxo completo: do dado ao dado identificado" -> tudo começa aqui:
// um array de objetos simples. Cada tarefa carrega um "id" estável, que depois
// será usado para reencontrar o objeto original a partir de um clique na tela
// (ver instalarEventosDoQuadro em app.js).
// -----------------------------------------------------------------------------

export const tarefas = [
  {
    id: 1,
    titulo: 'Organizador de tarefas',
    projeto: 'Projeto em HTML',
    responsavel: 'Ana',
    prazo: '18/10',
    prioridade: 'Baixa',
    status: 'a-fazer',
  },
  {
    id: 2,
    titulo: 'Planner',
    projeto: 'Projeto em HTML com CSS',
    responsavel: 'Lucas',
    prazo: '20/08',
    prioridade: 'Média',
    status: 'a-fazer',
  },
  {
    id: 3,
    titulo: 'Cronômetro para cozinha',
    projeto: 'Projeto em Python',
    responsavel: 'Maria',
    prazo: '14/08',
    prioridade: 'Média',
    status: 'em-andamento',
  },
  {
    id: 4,
    titulo: 'Automação com calendário',
    projeto: 'Projeto em Python',
    responsavel: 'Marta',
    prazo: '15/08',
    prioridade: 'Alta',
    status: 'em-andamento',
  },
  {
    id: 5,
    titulo: 'Criação de bot para vendas',
    projeto: 'Projeto em Python',
    responsavel: 'Carlos',
    prazo: '20/09',
    prioridade: 'Alta',
    status: 'em-revisao',
  },
  {
    id: 6,
    titulo: 'Blog de Lego',
    projeto: 'Projeto em HTML e CSS',
    responsavel: 'Fernanda',
    prazo: '22/10',
    prioridade: 'Média',
    status: 'em-revisao',
  },
  {
    id: 7,
    titulo: 'Blog de gatos',
    projeto: 'Projeto em HTML e CSS',
    responsavel: 'Sueli',
    prazo: '30/08',
    prioridade: 'Baixa',
    status: 'concluida',
  },
  {
    // Título propositalmente longo para validar o truncamento por
    // "text-overflow: ellipsis" definido em styles.css (critério de pronto:
    // "Título longo continua truncando").
    id: 8,
    titulo: 'Simulador de Batalhas Brawlhalla - edição campeonato relâmpago',
    projeto: 'Projeto em Python',
    responsavel: 'Elisa',
    prazo: '22/08',
    prioridade: 'Baixa',
    status: 'concluida',
  },
];
