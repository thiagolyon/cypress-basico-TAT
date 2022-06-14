/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html');
})

describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica o título da aplicação', () => {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Auuuuuuuuuu cachorro! Auuuuuuuuuu cachorro! Auuuuuuuuuu cachorro! Auuuuuuuuuu cachorro! Auuuuuuuuuu cachorro! Auuuuuuuuuu cachorro!';

        cy.get('#firstName').type('Thiago Lyon');
        cy.get('#lastName').type('Nascimento');
        cy.get('#email').type('thiago.lyon.passos@gmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0});
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible');
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#email').type('thiago.lyon.passos');
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Thiago Lyon');
        cy.get('#lastName').type('Nascimento');
        cy.get('#email').type('thiago.lyon.passos@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Teste!');
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Thiago Lyon').should('have.value', 'Thiago Lyon').clear().should('have.value', '');
        cy.get('#lastName').type('Nascimento').should('have.value', 'Nascimento').clear().should('have.value', '');
        cy.get('#email').type('thiago.lyon.passos@gmail.com').should('have.value', 'thiago.lyon.passos@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('61981860936').should('have.value', '61981860936').clear().should('have.value', '');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();  

        cy.get('.success').should('be.visible');
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback');
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check().should('be.checked');
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type=checkbox]').check().should('be.checked').last().uncheck().should('not.be.checked');
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: "drag-drop"}).then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null }).as('arquivoSelecionado')
        cy.get('input[type="file"]').selectFile('@arquivoSelecionado', {action: 'drag-drop'}).then(input => {
            expect(input[0].files[0].name).to.equal('example.json');
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click();

        cy.contains('Talking About Testing').should('be.visible')
    })
  })
