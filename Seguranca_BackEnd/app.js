/*
  ==========================================================================
  📌 GABARITO DO PROFESSOR: DESAFIO DO SERVIDOR SEGURO
  Componente Curricular: Desenvolvimento de Sistemas / Segurança de Aplicações
  ==========================================================================
*/

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Chave secreta usada para assinar e validar a autenticidade dos tokens
const CHAVE = "CPS_SECRET_2026";

// Banco de dados simulado em memória para armazenamento temporário
const usuarios = [];

// ==========================================================================
// 🟢 PASSO 1: CADASTRO DE USUÁRIO (Criptografar para proteger)
// ==========================================================================
app.post('/cadastro', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // [RESOLVIDO - LACUNA A]
        // Transforma a senha em formato de texto limpo em um Hash seguro
        const senhaProtegida = await bcrypt.hash(password, 10);

        // Salva o objeto no array simulando a tabela do banco de dados
        usuarios.push({ 
            id: usuarios.length + 1,
            username, 
            passwordHash: senhaProtegida, 
            role 
        });

        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao processar o cadastro.");
    }
});

// ==========================================================================
// 🟢 PASSO 2: LOGIN (Validar a senha e entregar o Crachá/Token)
// ==========================================================================
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Busca o usuário no banco de dados simulado
    const usuario = usuarios.find(u => u.username === username);
    if (!usuario) {
        return res.status(400).send("Usuário não encontrado.");
    }

    // [RESOLVIDO - LACUNA B]
    // Compara a senha enviada na requisição com o Hash guardado no banco
    const senhaCorreta = await bcrypt.compare(password, usuario.passwordHash);
    if (!senhaCorreta) {
        return res.status(401).send("Senha incorreta.");
    }

    // [RESOLVIDO - LACUNA C]
    // Cria o token JWT (Crachá Digital) carregando a identificação e a Role
    const tokenGerado = jwt.sign({ id: usuario.id, role: usuario.role }, CHAVE, { expiresIn: '1h' });
    
    // Retorna o token estruturado para o cliente
    res.json({ token: tokenGerado });
});

// ==========================================================================
// 🟢 PASSO 3: SEGURANÇA DA PORTA (Middleware que inspeciona o Crachá)
// ==========================================================================
function verificarAcesso(rolesPermitidas) {
    return (req, res, next) => {
        // [RESOLVIDO - LACUNA D]
        // Captura o token enviado no cabeçalho secreto 'authorization'
        const tokenEnviado = req.headers['authorization'];
        if (!tokenEnviado) {
            return res.status(403).send("Acesso negado: Sem token de autorização.");
        }

        // [RESOLVIDO - LACUNA E]
        // Valida se o token foi gerado pelo nosso servidor e se não expirou
        jwt.verify(tokenEnviado, CHAVE, (err, decoded) => {
            if (err) {
                return res.status(401).send("Token inválido ou expirado.");
            }

            // [RESOLVIDO - LACUNA F]
            // Extrai as informações de perfil (role) decodificadas de dentro do token
            const cargoUsuario = decoded.role;

            // Verifica se a Role do usuário faz parte das regras permitidas na rota
            if (!rolesPermitidas.includes(cargoUsuario)) {
                return res.status(403).send("Acesso proibido: Seu perfil não tem permissão.");
            }
            
            // Se passou em todas as checagens, anexa os dados e autoriza a execução da rota
            req.usuarioId = decoded.id;
            req.usuarioRole = cargoUsuario;
            next();
        });
    };
}

// ==========================================================================
// 🟢 PASSO 4: DEFINIÇÃO DAS ROTAS PROTEGIDAS POR PERFIL (ROLES)
// ==========================================================================

// Rota restrita: Apenas usuários com a Role 'Administrador' conseguem entrar
app.get('/admin/painel', verificarAcesso(['Administrador']), (req, res) => {
    res.send(`Área restrita da Diretoria acessada com sucesso! Bem-vindo Admin ID: ${req.usuarioId}`);
});

// Rota compartilhada: Administradores e Vendedores possuem acesso liberado
app.get('/vendas', verificarAcesso(['Administrador', 'Vendedor']), (req, res) => {
    res.send("Painel de Vendas liberado para consulta.");
});

// Inicialização do servidor na porta 3000
app.listen(3000, () => {
    console.log("🚀 Servidor Gabarito rodando com sucesso na porta 3000!");
    console.log("Pronto para receber requisições de teste.");
});
