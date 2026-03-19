// process.env.PORT -> Tenta usar a porta que o sistema de hospedagem definir automaticamente (nuvem).
// || 3000 -> Se não tiver uma porta definida pelo sistema, ele usa a porta 3000 no nosso computador.
const port = process.env.PORT || 3000;

// app.listen -> Diz para a nossa API ficar "escutando" (esperando pedidos) nessa porta específica.
app.listen(port, () => {
  
  // console.log -> Apenas imprime uma mensagem no nosso terminal (tela preta) para avisar o programador
  // que deu tudo certo e o servidor está rodando perfeitamente.
  console.log(`Server listening on port ${port}`);
});
