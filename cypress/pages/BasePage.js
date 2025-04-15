import { selectors } from '../support/selectors';

export class BasePage {
  constructor() {
    this.selectors = selectors;
  }

  visit() {
    cy.visit('');
    return this;
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    return this.getElement(selector).click();
  }

  typeText(selector, text) {
    return this.getElement(selector).type(text);
  }

  shouldBeVisible(selector) {
    return this.getElement(selector).should('be.visible');
  }

  shouldContainText(selector, text) {
    return this.getElement(selector).should('contain', text);
  }
} 