const apiOrders = `${Cypress.env("apiUrl")}/orders`;

export const getCart = (token = null) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return cy.request({
        method: "GET",
        url: apiOrders,
        headers: headers,
        failOnStatusCode: false,
    });
};

export const addToCart = (token, productId, quantity = 1) => {
    return cy.request({
        method: "PUT",
        url: `${apiOrders}/add`,
        headers: { Authorization: `Bearer ${token}` },
        body: { product: productId, quantity }
    });
};
