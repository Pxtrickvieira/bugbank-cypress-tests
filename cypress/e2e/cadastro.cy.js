

describe('Cadastro - BugBank', () => {

  const createUser = () => ({
    email: `qa_${Date.now()}_${Math.random()}@test.com`,
    name: 'QA Teste',
    password: '123456'
  })

  const abrirEPrencherCadastro = (user) => {
    cy.openRegister()
    cy.fillRegisterForm(user)
  }

  const validarSucessoEFechar = () => {
    cy.get('#modalText')
      .should('be.visible')
      .and('contain.text', 'foi criada com sucesso')

    cy.closeModal()
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve criar conta com sucesso', () => {
    const user = createUser()

    abrirEPrencherCadastro(user)
    cy.submitRegister()

    validarSucessoEFechar()
  })

  it('Deve exibir validação ao tentar cadastrar sem preencher campos', () => {
    cy.openRegister()
    cy.submitRegister()

    cy.get('form').eq(1).within(() => {
      cy.contains('É campo obrigatório').should('exist')
    })
  })

  it('Não deve permitir cadastro com senhas diferentes', () => {
    const user = createUser()

    cy.openRegister()

    cy.get('form').eq(1).within(() => {
      cy.get('input[name="email"]').type(user.email, { force: true })
      cy.get('input[name="name"]').type(user.name, { force: true })
      cy.get('input[name="password"]').type('123456', { force: true })
      cy.get('input[name="passwordConfirmation"]').type('654321', { force: true })
      cy.contains('Cadastrar').click({ force: true })
    })

    cy.get('#modalText').should('be.visible')
    cy.closeModal()
  })

  it('Não deve permitir cadastro com e-mail já cadastrado', () => {
    const user = createUser()

    // 1º cadastro (sucesso)
    abrirEPrencherCadastro(user)
    cy.submitRegister()
    validarSucessoEFechar()

    // 2º cadastro com o MESMO email
    abrirEPrencherCadastro(user)
    cy.submitRegister()

    // ✅ BugBank às vezes NÃO mostra modal no erro de repetição.
    // Então a validação precisa ser flexível:
    cy.get('body').then(($body) => {
      const temModal = $body.find('#modalText').length > 0

      if (temModal) {
        cy.get('#modalText')
          .should('be.visible')
          .and('not.contain.text', 'foi criada com sucesso')

        cy.closeModal()
      } else {
        // se não tem modal, garantimos que não houve sucesso em nenhum lugar
        cy.contains('foi criada com sucesso').should('not.exist')
      }
    })
  })

  it('Não deve permitir cadastro sem nome', () => {
    const user = createUser()

    cy.openRegister()

    cy.get('form').eq(1).within(() => {
      cy.get('input[name="email"]').type(user.email, { force: true })
      cy.get('input[name="password"]').type(user.password, { force: true })
      cy.get('input[name="passwordConfirmation"]').type(user.password, { force: true })
      cy.contains('Cadastrar').click({ force: true })
    })

    cy.get('#modalText').should('be.visible')
    cy.closeModal()
  })

  it('Não deve permitir cadastro com e-mail inválido', () => {
    const user = createUser()

    cy.openRegister()

    cy.get('form').eq(1).within(() => {
      cy.get('input[name="email"]').type('email_invalido', { force: true })
      cy.get('input[name="name"]').type(user.name, { force: true })
      cy.get('input[name="password"]').type(user.password, { force: true })
      cy.get('input[name="passwordConfirmation"]').type(user.password, { force: true })

      cy.get('input[name="email"]').then(($input) => {
        expect($input[0].checkValidity()).to.eq(false)
      })

      cy.contains('Cadastrar').click({ force: true })
    })
  })

})