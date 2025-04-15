import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor() {
    super();
  }

  goToCart() {
    this.clickElement(this.selectors.cartButton);
    return this;
  }

  verifyProductInCart(productName, quantity) {
    this.getElement(this.selectors.cartLine)
      .contains(productName)
      .parent()
      .find(this.selectors.cartLineQuantity)
      .should('contain', quantity);
    return this;
  }

  removeProductFromCart(productName) {
    this.getElement(this.selectors.cartLine)
      .contains(productName)
      .parent()
      .find(this.selectors.cartLineDelete)
      .click();
    return this;
  }

  verifyCartEmpty() {
    this.getElement(this.selectors.cartLine).should('not.exist');
    return this;
  }
} 