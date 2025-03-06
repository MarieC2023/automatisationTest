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