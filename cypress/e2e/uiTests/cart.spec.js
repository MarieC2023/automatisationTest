import products from '../../fixtures/products.json';

describe('Cart Functionality', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should add a product to cart and verify it', () => {
    const product = products.products[0];
    
    // Given I am logged in
    // When I add a product to cart
    cy.addProductToCart(product.name, 2);
    
    // Then I should see the product in my cart
    cy.verifyCart(product.name, 2);
  });

  it('should remove a product from cart', () => {
    const product = products.products[0];
    const cartPage = new CartPage();
    
    // Given I have a product in my cart
    cy.addProductToCart(product.name);
    
    // When I remove the product from cart
    cartPage
      .goToCart()
      .removeProductFromCart(product.name);
    
    // Then my cart should be empty
    cartPage.verifyCartEmpty();
  });
}); 