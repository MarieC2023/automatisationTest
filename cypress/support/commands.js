// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



import { selectors } from "./selectors";
import credentials from "../fixtures/credentials.json";

import './apiCommands/apiAuth';
import './apiCommands/apiCart';
import './apiCommands/apiProducts';
import './apiCommands/apiReviews';

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('goToLoginPage', () => {
  cy.get(selectors.loginButton).click();
});

Cypress.Commands.add('login', () => {
  cy.get(selectors.usernameField).type(credentials.user.username);
  cy.get(selectors.passwordField).type(credentials.user.password);
  cy.get(selectors.submitButton).click();
});

Cypress.Commands.add("loginSession", () => {
  cy.session([credentials.user.username, credentials.user.password], () => {
    cy.visit(credentials.baseURL);
    cy.goToLoginPage();
    cy.login();

    cy.wait('@loginRequest').then((interception) => {
      const token = interception.response.body.token;
      if (token) {
        cy.window().then((win) => {
          win.localStorage.setItem("user", token);
        });
      }
    });
  });
});