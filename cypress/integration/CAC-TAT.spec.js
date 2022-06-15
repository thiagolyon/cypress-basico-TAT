/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html');
})

describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica o título da aplicação', () => {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('Auuuuuuuuuu ', 20)
        
        cy.clock();

        cy.get('#firstName').type('Thiago Lyon');
        cy.get('#lastName').type('Nascimento');
        cy.get('#email').type('thiago.lyon.passos@gmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0});
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible');

        cy.tick(3000)

        cy.get('.success').should('not.be.visible');
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock();
        cy.get('#email').type('thiago.lyon.passos');
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');

        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock();
        
        cy.get('#firstName').type('Thiago Lyon');
        cy.get('#lastName').type('Nascimento');
        cy.get('#email').type('thiago.lyon.passos@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Teste!');
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');

        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Thiago Lyon').should('have.value', 'Thiago Lyon').clear().should('have.value', '');
        cy.get('#lastName').type('Nascimento').should('have.value', 'Nascimento').clear().should('have.value', '');
        cy.get('#email').type('thiago.lyon.passos@gmail.com').should('have.value', 'thiago.lyon.passos@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('61981860936').should('have.value', '61981860936').clear().should('have.value', '');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock();
        
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');

        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    })

    
    it('envia o formuário com sucesso usando um comando customizado', () => {

        cy.clock();

        cy.fillMandatoryFieldsAndSubmit();  

        cy.get('.success').should('be.visible');

        cy.tick(3000);

        cy.get('.success').should('not.be.visible');
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

    it('verifica se mensagem de erro aparece e desaparece em 3 segundos', () => {
        cy.clock();
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    })

    it('verifica se mensagem de sucesso aparece e desaparece em 3 segundos', () => {
        cy.clock();

        cy.fillMandatoryFieldsAndSubmit();

        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    Cypress._.times(5, () => {
        it('Repete o teste de aprovação padrão 5 vezes', () => {
            cy.clock();

            cy.fillMandatoryFieldsAndSubmit();
    
            cy.tick(3000)
            cy.get('.success').should('not.be.visible')
        })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success').should('not.be.visible').invoke('show').should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.').invoke('hide').should('not.be.visible');

        cy.get('.error').should('not.be.visible').invoke('show').should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible');
      })

      it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('Texto Longo ', 10);

        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText);
      })

      it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            expect(response.body).to.include('CAC TAT');
        })
      })

      it.only('achando o gatinho', () => {
        cy.get('#cat').invoke('show').should('be.visible')

        cy.get('#title').invoke('text', 'CAT 🐈 TAT')
      })
  })
