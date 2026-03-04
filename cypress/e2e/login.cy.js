
describe('Login - BugBank', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    const createUser = () => ({
        email: `qa_${Date.now()}_${Math.random()}@test.com`,
        name: 'patrick',
        password: 'pwd123',
    })

    const criarConta = (user) => {
        cy.openRegister()
        cy.fillRegisterForm(user)
        cy.submitRegister()


        cy.get('#modalText')
            .should('be.visible')
            .and('contain.text', 'foi criada com sucesso')

        cy.closeModal()
        cy.reload()
    }

    it('Deve fazer login com sucesso', () => {
        const user = createUser()

        criarConta(user)

        cy.loginUI(user)

        cy.contains('Olá').should('exist')
        cy.contains('TRANSFERÊNCIA').should('exist')
    })


    it('Não deve permitir login com senha incorreta', () => {
        const user = createUser()

        criarConta(user)

        cy.loginUI({
            email: user.email,
            password: 'senha_errada'
        })

        cy.get('#modalText')
            .should('be.visible')
            .and('contain.text', 'Usuário ou senha inválido')
    })


    it('Não deve permitir login sem preencher e-mail', () => {
        const user = createUser()

        cy.get('input[name="password"]')
            .first()
            .type(user.password)

        cy.contains('Acessar').click({ force: true })

        cy.contains('É campo obrigatório').should('exist')
    })


    it('Não deve permitir login sem preencher senha', () => {
        const user = createUser()

        cy.get('input[name="email"]')
            .first()
            .type(user.email)

        cy.contains('Acessar').click({ force: true })

        cy.contains('É campo obrigatório').should('exist')
    })


    it('Não deve permitir login sem preencher e-mail e senha', () => {
        cy.contains('Acessar').click({ force: true })

        cy.contains('É campo obrigatório').should('exist')
    })


    it('Não deve permitir login com e-mail inválido', () => {
        cy.get('input[name="email"]').first().type('patrick.jvcgmail.com')
        cy.get('input[name="password"]').first().type('pwd123')

        cy.contains('Acessar').click({ force: true })

        cy.get('input[name="email"]').first().then(($input) => {
            expect($input[0].checkValidity()).to.eq(false)
        })
    })

    it('Não deve permitir login com e-mail inexistente', () => {
        cy.loginUI({
            email: `nao_existe_${Date.now()}_${Math.random()}@test.com`,
            password: 'pwd123'
        })

        cy.get('#modalText')
            .should('be.visible')
            .and('contain.text', 'Usuário ou senha inválido')
    })
    
    it('Deve realizar logout com sucesso', () => {
        const user = createUser()

        criarConta(user)
        cy.loginUI(user)

        cy.contains('Sair').click()

        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.contains('Acessar').should('exist')
    })

})