/*******************************************************************************
  TÍTULO: Exercício Prático de Modelagem de Banco de Dados
  DISCIPLINA: Desenvolvimento de Sistemas / Back-End
  PÚBLICO: 3ª Série do Ensino Profissionalizante - Estado de São Paulo
  OBJETIVO: Praticar comandos DDL (Create) e DML (Insert/Select) no SQLite.
******************************************************************************/

-- 1. Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cargo TEXT
);

-- 2. Criação da tabela de logs/mensagens (Relacionada aos usuários)
CREATE TABLE IF NOT EXISTS mensagens_backend (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    conteudo TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 3. Inserção de dados para teste (Seed)
INSERT INTO usuarios (nome, email, cargo) VALUES 
('Professor Caio', 'caio@escola.com', 'Instrutor Back-End'),
('Aluno Exemplo', 'aluno@estudante.com', 'Desenvolvedor Junior');

INSERT INTO mensagens_backend (usuario_id, conteudo) VALUES 
(1, 'Bem-vindos à aula de bancos de dados!'),
(2, 'Dúvida: Como funciona o AUTOINCREMENT?');

-- 4. Consulta para verificar se funcionou
SELECT u.nome, m.conteudo, m.data_envio 
FROM usuarios u 
JOIN mensagens_backend m ON u.id = m.usuario_id;
