export const selectors = {
  home: {
    btnRegistrar: 'button:contains("Registrar")',
    loginEmail: 'input[name="email"]',
    loginPassword: 'input[name="password"]',
  },

  register: {
    form: 'form',
    email: 'input[name="email"]',
    name: 'input[name="name"]',
    password: 'input[name="password"]',
    passwordConfirmation: 'input[name="passwordConfirmation"]',
    btnCadastrar: 'button:contains("Cadastrar")',
  },

  modal: {
    btnClose: '#btnCloseModal',
    text: '#modalText'
  }
}