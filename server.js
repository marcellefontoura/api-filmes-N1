// =============================
// IMPORTANDO E CONFIGURANDO O SERVIDOR
// =============================

const express = require("express"); //Importando o Express (framework que facilita criar servidor no Node)

const app = express(); //Criando o servidor usando o express

app.use(express.json()); //Middleware: permite que o servidor entenda dados enviados em JSON no body. Ele executa antes da resposta final. Fica entre a requisição e a resposta.

// =============================
// BANCO DE DADOS FICTÍCIO
// =============================

// Aqui estamos simulando um banco de dados.
// Em vez de usar um banco real, usamos um array.
// Cada objeto dentro do array representa um filme.

// Array de objetos [{},{},{}]

const filmes = [
  {
    id: 1,
    titulo: "Interestelar",
    genero: "Ficção",
  },
  {
    id: 2,
    titulo: "velozes e furiosos 5",
    genero: "Ação",
  },
  {
    id: 3,
    titulo: "As branquelas",
    genero: "Comédia",
  },
  {
    id: 4,
    titulo: "O Poderoso Chefão",
    genero: "Drama",
  },
  {
    id: 5,
    titulo: "missão impossive ",
    genero: "Ação",
  },
  { id: 6, titulo: "Até que a sorte nos separe", genero: "Comédia" },
  {
    id: 7,
    titulo: "Oblivion",
    genero: "Ficção",
  },
];

// =============================
// ROTAS
// Estrutura geral:
// app.verbo("caminho", (req, res) => {Função} )
// =============================

// =====  Criando Rota principal "/"  =====

// Quando alguém acessa a raiz do servidor,
// enviamos uma mensagem simples.

//req entra no servidor.
//res sai do servidor

app.get("/", (req, res) => {
  res.send("API de Filmes");
});

// =====  Criando Rota para Listar todos os filmes ( /filmes ) =====

// Retorna o array completo em formato JSON.

app.get("/filmes", (req, res) => {
  res.json(filmes);
});

// --------------------------------------------------
//Parâmetros de rotas
// ROTA: BUSCAR FILME POR ID
// GET /filmes/:id
// --------------------------------------------------

// :id é um parâmetro de rota. Significa que estamos esperando receber um valor pela URL. Tudo que vem da url vem como texto (string)

app.get("/filmes/:id", (req, res) => {
  // Tudo que vem da URL é string.
  // Exemplo: se acessarmos /filmes/2
  // req.params.id será "2" (texto).
  // Convertendo para número para poder comparar com o id do array.
  // JavaScript diferencia string de número, mesmo que pareçam iguais.

  const idQueFoiPegoNaURL = Number(req.params.id);

  // IMPORTANTE:
  // "filmes" (plural) é o ARRAY inteiro.
  // Já "filme" (singular) representa UM item por vez dentro do array.

  // O .find() percorre o array automaticamente.
  // A cada volta, ele pega um item e coloca dentro da variável (filme).
  // Esse nome "filme" poderia ser qualquer outro nome,
  // mas usamos singular porque estamos olhando um item individual.

  const filmeEncontrado = filmes.find(
    // Aqui estamos dizendo:
    // "Encontre o filme cujo id seja igual ao id recebido na URL"
    // Se essa comparação for verdadeira (true),
    // o .find() para e retorna esse objeto.

    (filme) => filme.id === idQueFoiPegoNaURL, //(filme) é apenas uma variável temporária.
  );

  // Se encontrar, retornamos o filme em formato JSON.
  // Se não encontrar, o resultado será undefined.
  res.json(filmeEncontrado);
});

// --------------------------------------------------
// ROTA: CADASTRAR NOVO FILME
// POST /filmes
// --------------------------------------------------
// O cliente envia dados no body (JSON).
// O servidor recebe e adiciona no array.

app.post("/filmes", (req, res) => {
  const novoFilme = {
    id: filmes.length + 1, //ID é gerado com base no tamanho da array.
    titulo: req.body.titulo,
    genero: req.body.genero,
  };

  filmes.push(novoFilme); //Adiciona o novo objeto (novoFilme) no final da array

  res.send(`O Filme ${novoFilme.titulo} foi cadastrado com sucesso`);
});

//=====================
//BANCO DE DADOS FICTÍCIO (SÉRIES)
//=====================

const series = [
  {
    id: 1,
    titulo: "Stranger Things",
    genero: "Ficção Científica",
  },
  {
    id: 2,
    titulo: "Friends",
    genero: "Comédia",
  },
  {
    id: 3,
    titulo: "O Mentalista",
    genero: "Drama",
  },
];

//=====================
// ROTA DE SÉRIES
//=====================

app.get("/series", (req, res) => {
  res.send(series);
});

//=====================
// ROTA POST para cadastrar uma nova série
//=====================

app.post("/series", (req,res)=>{

  const novaSerie = {
    id: series.length + 1, 
    titulo: req.body.titulo,
    genero: req.body.genero
  }

  series.push(novaSerie);
  res.send(`A série ${novaSerie.titulo} foi cadastrada com sucesso!`)

})




// =============================
// CONFIGURAÇÃO DA PORTA
// =============================

const PORT = 3000; // Definindo a porta onde o servidor vai rodar.

//Servidor(app), escute (listen) a nossa porta(PORT). E faça tal coisa: Mostre no localhost na porta 3000
// Faz o servidor "escutar" requisições nessa porta.

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

// ==================================================
// SOBRE O POSTMAN
// ==================================================
//
// O Postman é uma ferramenta muito usada no mercado para desenvolvimento e testes de APIs.
//
// Ele simula o que um front-end (site ou aplicativo) faria ao conversar com o servidor.
//
// Com o Postman conseguimos:
//
// - Enviar requisições GET (buscar dados)
// - Enviar requisições POST (criar dados)
// - Enviar dados em formato JSON (no body)
// - Testar PUT (atualizar)
// - Testar DELETE (deletar)
//
// Ou seja:
// Ele permite testar nossa API mesmo sem ter um site conectado a ela.
//
// Fluxo que acontece:
// Postman → envia requisição → Servidor responde → Postman mostra o resultado

// // ========================================================================================================================================================
// // BLOCO EXTRA – EXEMPLOS DIDÁTICOS (aula do dia 02/03/2026)
// // ========================================================================================================================================================
// // ATENÇÃO:
// // Essas rotas existem apenas para aprendizado.
// // Em projetos reais, não usamos GET para criar dados.
// // Estamos fazendo isso apenas para entender como o array muda.
// // ==================================================

// // ========================================================================================================================================================
// // 1) VERSÃO DIDÁTICA – CRIAÇÃO SEM BODY (POST FIXO)
// // ========================================================================================================================================================
// // Criamos uma rota POST chamada "/filmes-teste".
// // Quando alguém fizer essa requisição,
// // o servidor vai criar um filme automaticamente.

// app.post("/filmes-teste", (req, res) => {
//   // Criando um novo objeto manualmente.
//   // Aqui não usamos req.body.
//   // Estamos definindo os valores direto no código.

//   const novoFilme = {
//     id: filmes.length + 1, // Criando um id simples baseado no tamanho atual do array. Se tiver 7 filmes, o próximo será 8.
//     titulo: "Olhos Famintos", // Definindo o título do filme
//     genero: "Terror", // Definindo o gênero do filme
//   };

//   filmes.push(novoFilme); // O método push adiciona o novo objeto no final do array "filmes".

//   // Mostrando no terminal como o array ficou depois que adicionamos o novo filme.
//   console.log("Array atualizado após POST /filmes-teste:");
//   console.log(filmes);

//   // Enviando como resposta o filme que foi criado.
//   // res.json transforma o objeto em JSON automaticamente.
//   res.json(novoFilme);
// });

// // ========================================================================================================================================================
// // 2) "GAMBIARRA DO BEM" – CRIAÇÃO USANDO GET
// // ========================================================================================================================================================
// // Normalmente, GET é usado apenas para buscar dados.
// // Aqui estamos usando GET para criar,
// // apenas para visualizar que uma requisição
// // pode alterar o estado da aplicação.

// app.get("/criar-filme-teste", (req, res) => {
//   // Criando outro objeto manualmente

//   const novoFilmeTeste = {
//     id: filmes.length + 1, //Mesmo padrão de geração de id
//     titulo: "Faces da Morte", //Título fixo
//     genero: "Terror", //Gênero fixo
//   };

//   filmes.push(novoFilmeTeste); //Adicionando o novo filme no array

//   //Mostrando no terminal como o array foi alterado
//   console.log("Array atualizado após GET /criar-filme-teste:");
//   console.log(filmes);

//   // Retornando o filme criado como resposta
//   res.json(novoFilmeTeste);
// });