//ici je veux testser la page de connexion
// 1 cliquez sur le bouton de connexion
// 2 affichage de la page avec le formulaire
// 3 entrez les info de connexion email + mdp
// 4 être rediriger vers page accueil 
// 5 vérifier la présence du bouton panier

describe('Test de connexion', () => {
  it("Devrait se connecter et rediriger vers la page d'accueil avec le bouton Mon panier", () => {
    
    cy.visit('baseUrl');

    cy.intercept('POST', '/login').as('loginRequest'); 
     
    cy.getBySel("nav-link-login").click();
      
    cy.getBySel("login-input-username").type('test2@test.fr');
    cy.getBySel("login-input-password").type('testtest');
    cy.getBySel("login-submit").click();

    
    cy.wait('@loginRequest')
      .then((interception) => {
        expect(interception.request.body).to.deep.equal({
          username: 'test2@test.fr', 
          password: 'testtest'
        });

        expect(interception.response.body).to.have.property('token');
      });

    const token = 'token';
    cy.window().then((win) => {
      win.localStorage.setItem("user", token);
    });

    cy.url().should('eq', "http://localhost:8080/#/");
   
    cy.getBySel("nav-link-cart").should('be.visible');

  });
});
