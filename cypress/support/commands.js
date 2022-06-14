/// <reference types="Cypress" />

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Thiago Lyon').should('have.value', 'Thiago Lyon');
    cy.get('#lastName').type('Nascimento').should('have.value', 'Nascimento');
    cy.get('#email').type('thiago.lyon.passos@gmail.com').should('have.value', 'thiago.lyon.passos@gmail.com');
    cy.get('#open-text-area').type('Campo obrigatório').should('have.value', 'Campo obrigatório');
    cy.contains('button', 'Enviar').click();
}) 
