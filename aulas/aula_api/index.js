// ==========================================
// PARTE 1: IMPORTAÇÃO E PREPARAÇÃO
// ==========================================
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// ==========================================
// PARTE 2: ROTAS (O CARDÁPIO DA API)
// ==========================================
app.get('/api/users', (req, res) => {
  // Quando o cliente acessar essa rota, a API responde com esse JSON:
  res.json({ mensagem: "Lista de usuários encontrada com sucesso!" });
});

// ==========================================
// PARTE 3: LIGANDO O SERVIDOR
// ==========================================
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando perfeitamente na porta ${port} 🚀`);
});
