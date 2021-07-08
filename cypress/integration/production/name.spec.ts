describe('CYPRESS_ env test', () => {
  it('Get name from CYPRESS_ env variable from the System', () => {
    const name = Cypress.env('NAME')
    expect(name).to.equal('abhi')
  })
})
