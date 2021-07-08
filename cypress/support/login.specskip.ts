const email = 'prod1@gmail.com'
const password = 'Test123456'

xdescribe('Login', () => {
  it('Visit App', () => {
    cy.visit('/')
    cy.title().should('contain', 'Welcome to EdApp')
  })

  it('Click Sign In button', () => {
    cy.contains('Sign in').click()
    cy.url().should('include', '#login')
  })

  it('Enter Email', () => {
    cy.get('[name="username"]').type(email)
    cy.contains('Next').click()
  })

  it('Enter Password', () => {
    cy.get('[name="password"]').clear().type(password)
    cy.get('form').submit()
    cy.url().should('include', '#home')
  })

  it('View landing page', () => {
    cy.get('h1').should('be.visible').and('contain.text', 'Courses').and('contain.text', 'My Profile')
    // .and('contain.text', 'THIS WILL FAIL')
  })
})
