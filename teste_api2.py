from flask import Flask, jsonify, request

app = Flask(__name__)

# O nosso "Banco de Dados" é apenas uma lista de dicionários (objetos)
produtos = [
    {"id": 1, "nome": "Camiseta", "preco": 50.00},
    {"id": 2, "nome": "Tênis", "preco": 120.00}
]

# 1. Rota para VER os produtos (GET - "Pegar")
@app.route('/produtos', methods=['GET'])
def listar_produtos():
    return jsonify(produtos)

# 2. Rota para CRIAR um novo produto (POST - "Postar/Enviar")
@app.route('/produtos', methods=['POST'])
def adicionar_produto():
    dados = request.get_json()
    
    # Criamos um ID automático baseado no último item da lista
    novo_id = produtos[-1]['id'] + 1 if produtos else 1
    
    # Montamos o novo produto com os dados que o aluno enviou
    novo_produto = {
        "id": novo_id,
        "nome": dados.get("nome"),
        "preco": dados.get("preco")
    }
    
    produtos.append(novo_produto)
    return jsonify({"mensagem": "Produto adicionado!", "produto": novo_produto}), 201

# 3. Rota para ATUALIZAR um produto (PUT - "Colocar/Alterar")
@app.route('/produtos/<int:id>', methods=['PUT'])
def atualizar_produto(id):
    # Procuramos o produto pelo ID na nossa lista
    produto = next((p for p in produtos if p['id'] == id), None)
    
    if produto is None:
        return jsonify({"erro": "Ops! Esse produto não existe."}), 404

    dados_novos = request.get_json()
    
    # Atualizamos apenas o que foi enviado
    produto['nome'] = dados_novos.get('nome', produto['nome'])
    produto['preco'] = dados_novos.get('preco', produto['preco'])
    
    return jsonify({"mensagem": "Produto atualizado com sucesso!"})

# 4. Rota para EXCLUIR um produto (DELETE - "Apagar")
@app.route('/produtos/<int:id>', methods=['DELETE'])
def remover_produto(id):
    global produtos
    produto = next((p for p in produtos if p['id'] == id), None)
    
    if produto is None:
        return jsonify({"erro": "Produto não encontrado!"}), 404

    produtos.remove(produto)
    return jsonify({"mensagem": "Produto removido da lista!"})

# Comando para ligar o servidor
if __name__ == '__main__':
    app.run(debug=True)