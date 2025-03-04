describe("Page de connexion", ()=> {
  it("Présence des champs de saisie et du bouton de connexion", () =>{
    cy.visit("#/login");
    cy.getBySel("login-input-username").should("be.visible");
    cy.getBySel("login-input-password").should("be.visible");
    cy.getBySel("login-submit").should("be.visible");
  });
});

describe("Vérification du bouton Ajouter au panier", () => {
  it("Doit afficher le bouton Ajouter au panier sur une fiche produit après connexion", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env('apiUrl')}/login`,
      body: {
          username: "test2@test.fr",
          password: "testtest"
      }
  }).then((response) => {
      expect(response.status).to.eq(200); 
      const token = response.body.token;

      cy.window().then((win) => {
        win.localStorage.setItem("user", token)
      });
      cy.reload();

      cy.visit("#/products/random");
      cy.contains("Ajouter au panier").should("be.visible");
    });
  });
});
