import { login } from "../../services/apiAuth";

describe("Page produits", () => {
  
  beforeEach(() => {
    login("test2@test.fr", "testtest").then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      cy.window().then((win) => {
        win.localStorage.setItem("user", token);
      });
      cy.reload();
    });
  });

  it("Doit afficher le bouton Ajouter au panier après connexion", () => {
    cy.visit("#/products/random");
    cy.contains("Ajouter au panier").should("be.visible");
  });

  it("Doit afficher la disponibilité du produit", () => {
    cy.visit("#/products/random");
    cy.getBySel("detail-product-stock").should("be.visible");
  });

});
