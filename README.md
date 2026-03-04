# 🐞 BugBank E2E Tests — Cypress

![BugBank QA](./bugbank.png)

Automação de testes **End-to-End (E2E)** utilizando **Cypress** no sistema **BugBank**.

O projeto cobre fluxos principais de um usuário em um sistema bancário digital, validando comportamentos esperados e cenários de erro.

---

# 🚀 Tecnologias

- Cypress 15
- JavaScript
- Node.js
- Custom Commands

---

# 🧪 Cenários Automatizados

## Cadastro
- Criar conta com sucesso
- Validação de campos obrigatórios
- Senhas diferentes
- Email inválido
- Email já cadastrado

## Login
- Login com sucesso
- Senha incorreta
- Email inexistente
- Campos obrigatórios
- Email inválido

## Sessão
- Logout do sistema

## Transferência
- Transferência entre contas
- Validação de saldo insuficiente
- Valor de transferência inválido

## Extrato
- Registro de débito após transferência

---

# 📂 Estrutura do Projeto

```
cypress
├── e2e
│   ├── login.cy.js
│   ├── cadastro.cy.js
│   └── transferencia.cy.js
│
├── support
│   ├── commands.js
│   └── selectors.js
│
cypress.config.js
package.json
README.md
```

---

# ⚙️ Instalação

Clone o repositório

```
git clone https://github.com/Pxtrickvieira/bugbank-cypress-tests.git
```

Entre na pasta do projeto

```
cd bugbank-cypress-tests
```

Instale as dependências

```
npm install
```

---

# ▶️ Executar os testes

Abrir interface do Cypress

```
npm run cy:open
```

Executar testes em modo headless

```
npm run cy:run
```

---

# 🎯 Objetivo do Projeto

Este projeto demonstra habilidades em:

- Automação de testes End-to-End
- Estruturação de testes com Cypress
- Criação de Custom Commands
- Validação de fluxos críticos de aplicação
- Escrita de cenários positivos e negativos

---

# 👨‍💻 Autor

Patrick  
QA Automation Engineer