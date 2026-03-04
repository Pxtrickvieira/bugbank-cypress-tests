
describe('Transferência - BugBank', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  const createUser = () => ({
    email: `qa_${Date.now()}_${Math.random()}@test.com`,
    name: 'patrick',
    password: 'pwd123',
  })

  const criarConta = (user, comSaldo = false) => {

    cy.openRegister()
    cy.fillRegisterForm(user)

    if (comSaldo) {
      cy.get('#toggleAddBalance').click({ force: true })
    }

    cy.submitRegister()

    cy.get('#modalText')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const conta = text.match(/\d+-\d+/)[0]
        const [numero, digito] = conta.split('-')

        cy.wrap(numero).as('numeroConta')
        cy.wrap(digito).as('digitoConta')

        cy.closeModal()
        cy.reload()
      })
  }

  const fazerTransferencia = (numero, digito, valor, descricao) => {

    cy.get('#btn-TRANSFERÊNCIA')
      .should('be.visible')
      .click()

    cy.url().should('include', '/transfer')

    cy.get('input[name="accountNumber"]').type(numero)
    cy.get('input[name="digit"]').type(digito)
    cy.get('input[name="transferValue"]').type(`${valor}`)
    cy.get('input[name="description"]').type(descricao)

    cy.contains('Transferir agora').click()
  }


  it('Deve transferir valor com sucesso entre duas contas', () => {

    const userDestino = createUser()
    const userOrigem = createUser()

    criarConta(userDestino)

    cy.get('@numeroConta').then((numero) => {
      cy.get('@digitoConta').then((digito) => {

        criarConta(userOrigem, true)

        cy.loginUI(userOrigem)

        fazerTransferencia(numero, digito, 100, 'Teste Cypress')

        cy.get('#modalText')
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            const normalized = text.toLowerCase()
            expect(normalized).to.include('transfer')
            expect(normalized).to.include('sucesso')
          })
      })
    })
  })

  it('Não deve permitir transferir valor maior que o saldo', () => {

    const userDestino = createUser()
    const userOrigem = createUser()

    criarConta(userDestino)

    cy.get('@numeroConta').then((numero) => {
      cy.get('@digitoConta').then((digito) => {

        criarConta(userOrigem, true)

        cy.loginUI(userOrigem)

        fazerTransferencia(numero, digito, 5000, 'Teste valor alto')

        cy.get('#modalText')
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            const normalized = text.toLowerCase()
            expect(normalized).to.include('saldo')
            expect(normalized).to.include('suficiente')
          })
      })
    })
  })

  it('Não deve permitir transferir valor igual a zero', () => {

    const userDestino = createUser()
    const userOrigem = createUser()

    criarConta(userDestino)

    cy.get('@numeroConta').then((numero) => {
      cy.get('@digitoConta').then((digito) => {

        criarConta(userOrigem, true)

        cy.loginUI(userOrigem)

        fazerTransferencia(numero, digito, 0, 'Teste valor zero')

        cy.get('#modalText')
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            const normalized = text.toLowerCase()
            expect(normalized).to.include('valor da transferência')
          })
      })
    })
  })

  
  it('Deve registrar débito no extrato após transferência', () => {

    const userDestino = createUser()
    const userOrigem = createUser()
    const descricao = 'Teste Extrato'

    criarConta(userDestino)

    cy.get('@numeroConta').then((numero) => {
      cy.get('@digitoConta').then((digito) => {

        criarConta(userOrigem, true)

        cy.loginUI(userOrigem)

        fazerTransferencia(numero, digito, 100, descricao)

        cy.contains('Fechar').click()

        cy.contains('Voltar').click()
        cy.get('#btn-EXTRATO').click()

        cy.contains('Transferência enviada').should('exist')
        cy.contains('-R$').should('exist')
        cy.contains('100').should('exist')
        cy.contains(descricao).should('exist')
      })
    })
  })
})
