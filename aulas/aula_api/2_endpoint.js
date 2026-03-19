// app.get -> Define que esta rota vai responder ao método GET (usado para BUSCAR/LER dados)
// '/api/users' -> É o ENDPOINT. O endereço exato (a URL) que o cliente vai acessar.
app.get('/api/users', (req, res) => {
  
  // 'req' (Request/Requisição): É o PEDIDO do cliente. Contém tudo o que o usuário enviou para o servidor.
  // 'res' (Response/Resposta): É a BANDEJA do garçom. Usamos o 'res' para devolver a informação ao cliente.
  
  // lida com a solicitação GET para obter usuários
  // (Aqui dentro entraria o código para ir no banco de dados, buscar os usuários e devolver no 'res')
});
