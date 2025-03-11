const apiLogin = `${Cypress.env("apiUrl")}/login`;

export const login = (username, password) => {
    return cy.request({
        method: "POST",
        url: apiLogin,
        failOnStatusCode: false,
        body: { 
            username: username,
            password: password 
        }
    }).then((response) => {
        if (response.status === 200) {
            const token = response.body.token;
            Cypress.env("authToken", token); 
        }
        return response;
    });
};