from flask import Flask, jsonify, request

app = Flask(__name__)

# Dados iniciais (simulação de banco de dados)
produtos = [
    {"id": 1, "nome": "Camiseta", "preco": 50.00},
    {"id": 2, "nome": "Tênis", "preco": 120.00}
]

# Rota para listar todos os produtos (GET)
@app.route('/produtos', methods=['GET'])
def listar_produtos():
    return jsonify(produtos)

# Rota para adicionar um novo produto (POST)
@app.route('/produtos', methods=['POST'])
def adicionar_produto():
    novo_produto = request.get_json()
    produtos.append(novo_produto)
    return jsonify({"mensagem": "Produto adicionado com sucesso!"}), 201

# Rota para atualizar um produto existente (PUT)
@app.route('/produtos/<int:id>', methods=['PUT'])
def atualizar_produto(id):
    produto = next((p for p in produtos if p['id'] == id), None)
    if produto is None:
        return jsonify({"erro": "Produto não encontrado!"}), 404

    dados_atualizados = request.get_json()
    produto.update(dados_atualizados)
    return jsonify({"mensagem": "Produto atualizado com sucesso!"})

# Rota para remover um produto (DELETE)
@app.route('/produtos/<int:id>', methods=['DELETE'])
def remover_produto(id):
    produto = next((p for p in produtos if p['id'] == id), None)
    if produto is None:
        return jsonify({"erro": "Produto não encontrado!"}), 404

    produtos.remove(produto)
    return jsonify({"mensagem": "Produto removido com sucesso!"})

# Executa a aplicação
if __name__ == '__main__':
    app.run(debug=True)
