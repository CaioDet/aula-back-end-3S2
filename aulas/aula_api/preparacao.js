// 1. IMPORTAÇÕES (Trazendo as ferramentas que vamos usar)
// Aqui estamos "chamando" o Express, que é o nosso framework (a estrutura principal da nossa API)
const express = require('express');

// O body-parser é um tradutor. Ele ajuda a API a entender os dados (JSON) que os clientes enviam
const bodyParser = require('body-parser');

// 2. INICIALIZAÇÃO
// Aqui estamos criando a nossa aplicação de fato. A variável 'app' passa a ser a nossa API.
const app = express();

// 3. MIDDLEWARE (O Segurança/Recepcionista)
// O 'app.use' diz para a API: "Toda vez que chegar um pedido, passe por aqui primeiro".
// Nesse caso, ele garante que tudo que entrar seja lido no formato JSON.
app.use(bodyParser.json());
