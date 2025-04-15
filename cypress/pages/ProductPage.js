import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor() {
    super();
  }

  goToProductsPage() {
    this.clickElement(this.selectors.productButton);
    return this;
  }

  selectProduct(productName) {
    this.getElement(this.selectors.product)
      .contains(productName)
      .click();
    return this;
  }

  addToCart(quantity = 1) {
    this.typeText(this.selectors.quantityInput, quantity);
    this.clickElement(this.selectors.addToCartButton);
    return this;
  }

  verifyProductDetails(productName) {
    this.shouldContainText(this.selectors.productName, productName);
    return this;
  }
} 