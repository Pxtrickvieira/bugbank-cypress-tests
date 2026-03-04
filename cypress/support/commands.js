// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ...
import { selectors } from './selectors'

Cypress.Commands.add('openRegister', () => {
  cy.contains('Registrar').click()
})

Cypress.Commands.add('fillRegisterForm', ({ email, name, password }) => {
  cy.get(selectors.register.form).eq(1).within(() => {
    cy.get(selectors.register.email).type(email, { force: true })
    cy.get(selectors.register.name).type(name, { force: true })
    cy.get(selectors.register.password).type(password, { force: true })
    cy.get(selectors.register.passwordConfirmation).type(password, { force: true })
  })
})

Cypress.Commands.add('submitRegister', () => {
  cy.get(selectors.register.form).eq(1).within(() => {
    cy.contains('Cadastrar').click({ force: true })
  })
})

Cypress.Commands.add('closeModal', () => {
  cy.get(selectors.modal.btnClose).click()
})

Cypress.Commands.add('loginUI', ({ email, password }) => {
  cy.get(selectors.home.loginEmail).first().clear().type(email)
  cy.get(selectors.home.loginPassword).first().clear().type(password)
  cy.contains('Acessar').click()
})