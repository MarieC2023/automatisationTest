const apiUrl = Cypress.env("apiUrl");

export const login = (username, password) => {
    return cy.request({
        method: "POST",
        url: `${apiUrl}/login`,
        failOnStatusCode: false,
        body: { 
            username: username,
            password: password 
        }
    }).then((response) => {
        return response;
    });
};
