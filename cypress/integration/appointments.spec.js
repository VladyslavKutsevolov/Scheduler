describe('Appointments', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.request('GET', '/api/debug/reset');
    cy.contains('[data-testid=day]', 'Monday');
  });

  it('should book an interview', () => {
    cy.get('[alt=Add]')
      .first()
      .click()
      .get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones')
      .get("[alt='Sylvia Palmer']")
      .click();

    cy.contains('Save').click();
  });

  it('should edit an interview', () => {
    cy.get('[alt=Edit]')
      .first()
      .click({ force: true })
      .get('[data-testid=student-name-input]')
      .clear()
      .type('Vladyslav')
      .get("[alt='Tori Malcolm']")
      .click();

    cy.contains('Save').click();
  });

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]').first().click({ force: true });

    cy.contains('Confirm').click();

    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Vladyslav').should('not.exist');
  });
});
