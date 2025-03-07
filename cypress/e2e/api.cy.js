const { faker } = require("@faker-js/faker");




// ****************************************************************************** //
// ********************************** Tests GET ********************************* //
// ****************************************************************************** //


describe("Test sur le pannier", () => {
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

describe("Test sur la fiche produit", () => {
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

  it("La requête doit me renvoyer la liste de trois produits aléatoire", () => {
    cy.request({
      method: "GET",
      url: apiProducts,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);

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

describe("Test sur la page login", () => {

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





