/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/privacy.html');
})

describe('CAC TAT - Política de privacidade', () => {

    it.only('testa a página da política de privavidade de forma independente', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade');

        cy.contains('CAC TAT - Política de privacidade').should('be.visible');
    })
})