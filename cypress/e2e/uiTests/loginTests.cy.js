import credentials from '../../fixtures/credentials.json';

describe('Test de connexion', () => {
  beforeEach(() => {
    cy.visit(credentials.baseURL);
    cy.screenshot("avant-connexion")
    cy.intercept('POST','/login').as('loginRequest');
  })

  it("Devrait se connecter et afficher le bouton Mon panier", () => {
    cy.goToLoginPage();
    cy.screenshot("page-login");

    cy.login();
    cy.screenshot("formulaire-rempli");

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        username: credentials.user.username,
        password: credentials.user.password
      });
      expect(interception.response.body).to.have.property('token');
      
      const token = interception.response.body.token;
      cy.window().then((win) => {
        win.localStorage.setItem("user", token);
      });
    });
    cy.url().should('eq', `${credentials.baseURL}/#/`);
    cy.screenshot("apres-redirection");

    cy.getBySel("nav-link-cart").should('be.visible');
    cy.getBySel("nav-link-cart").screenshot("bouton-panier-seul");

  });
});
        