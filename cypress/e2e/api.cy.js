const { faker } = require("@faker-js/faker");




// ****************************************************************************** //
// ********************************** Tests GET ********************************* //
// ****************************************************************************** //


describe("Test GET sur le pannier", () => {
  before(() => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      Cypress.env("authToken", token);
    });
  });

  const apiOrders = `${Cypress.env("apiUrl")}/orders`;

  context("GET /orders", () => {
    it("La requête doit me retourner un code erreur 401", () => {
      cy.request({
        method: "GET",
        url: apiOrders,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });

  it("La requête doit me renvoyer la liste des produits qui sont dans le panier", () => {
    cy.request({
      method: "GET",
      url: apiOrders,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("orderLines").that.is.an("array");

      if (response.body.orderLines.length > 0) {
        response.body.orderLines.forEach((line) => {
          expect(line).to.have.property("id");
          expect(line).to.have.property("quantity");
          expect(line).to.have.property("product");

          expect(line.product).to.have.property("id");
          expect(line.product).to.have.property("name");
          expect(line.product).to.have.property("price");
        });
      } else {
        cy.log("Le panier est vide");
      }
    });
  });
});

describe("Test GET sur la fiche produit", () => {
  before(() => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      Cypress.env("authToken", token);
    });
  });

  const apiProducts = `${Cypress.env("apiUrl")}/products/random`;

  it("La requête doit me renvoyer une liste d'au moins un produit aléatoire", () => {
    cy.request({
      method: "GET",
      url: apiProducts,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(1);

      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("name");
      expect(response.body[0]).to.have.property("availableStock");
      expect(response.body[0]).to.have.property("skin");
      expect(response.body[0]).to.have.property("ingredients");
      expect(response.body[0]).to.have.property("description");
      expect(response.body[0]).to.have.property("price");
      expect(response.body[0]).to.have.property("picture");
      expect(response.body[0]).to.have.property("varieties");

    });
  });
});


// ****************************************************************************** //
// ********************************** Tests POST ******************************** //
// ****************************************************************************** //

describe("Test POST sur la page login", () => {

  it("La requête retourne un code 401 en cas d'erreur d'identification", () => {
    let fakerUserName = faker.internet.email();
    let fakerPassword = faker.internet.password();
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      failOnStatusCode: false,
      body: {
        username: fakerUserName,
        password: fakerPassword
      }

    }).then((response) => {
      expect(response.status).to.eq(401);

    });
  });
  it("La requête retourne un code 200 si l'utilisateur est connu", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

  });
});

describe("Test PUT sur le panier", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      Cypress.env("authToken", token);
    });

    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/products`,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      const produits = response.body;
      const produitEnStock = produits.find(p => p.availableStock > 0);
      const produitEnRupture = produits.find(p => p.availableStock <= 0);

      cy.wrap(produitEnStock).as("produitEnStock");
      cy.wrap(produitEnRupture).as("produitEnRupture");
    });
  });

  it("Ajoute un produit en stock au panier", () => {
    cy.get("@produitEnStock").then((produit) => {
      expect(produit).to.not.be.undefined;
  
      cy.request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}/orders/add`,
        headers: {
          Authorization: `Bearer ${Cypress.env("authToken")}`
        },
        body: {
          product: produit.id,
          quantity: 1
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  
  it("N'ajoute pas un produit en rupture de stock", () => {
    cy.get("@produitEnRupture").then((produit) => {
      expect(produit).to.not.be.undefined;
  
      cy.request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}/orders/add`,
        headers: {
          Authorization: `Bearer ${Cypress.env("authToken")}`
        },
        body: {
          product: produit.id,
          quantity: 1
        },
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.not.eq(200);
      });
    });
  });
  
});

describe("Test sur l'ajout d'avis", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      Cypress.env("authToken", token);
    });
  });

  it("L'avis est ajouter si tous les champs sont correctement rempli", () => {
   
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/reviews`,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`
      },
      body: {
        title: "chouette",
        comment: "mais le prix ça pique",
        rating: 2
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("L'avis n'est pas ajouter si des champs sont manquants", () => {
   
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/reviews`,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`
      },
      body: {
        title: "chouette",
        rating: 2
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
    });
  });

  it("Test un risque de faille XSS", () => {
   const testXSS = `<script>alert("XSS");</script>`;

    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/reviews`,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`
      },
      body: {
        title: "test XSS",
        comment: testXSS,
        rating: 5
      },
      failOnStatusCode: false
    }).then((response) => {
     
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
    });
  });
});

