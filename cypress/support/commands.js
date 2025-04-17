import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import credentials from '../fixtures/credentials.json';

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('login', () => {
  const loginPage = new LoginPage();
  loginPage
    .visit()
    .goToLoginPage()
    .login(credentials.user.username, credentials.user.password)
    .verifyLoginSuccess();
});

Cypress.Commands.add('addProductToCart', (productName, quantity = 1) => {
  const productPage = new ProductPage();
  productPage
    .goToProductsPage()
    .selectProduct(productName)
    .verifyProductDetails(productName)
    .addToCart(quantity);
});

Cypress.Commands.add('verifyCart', (productName, quantity) => {
  const cartPage = new CartPage();
  cartPage
    .goToCart()
    .verifyProductInCart(productName, quantity);
});
