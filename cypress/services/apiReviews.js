const apiReviews = `${Cypress.env("apiUrl")}/reviews`;

export const addReview = (token, title, comment, rating) => {
  return cy.request({
    method: "POST",
    url: apiReviews,
    headers: { Authorization: `Bearer ${token}` },
    body: { title, comment, rating },
    failOnStatusCode: false, 
  });
};
