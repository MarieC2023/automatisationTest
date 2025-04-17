import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor() {
    super();
  }

  goToLoginPage() {
    this.clickElement(this.selectors.loginButton);
    return this;
  }

  login(username, password) {
    this.typeText(this.selectors.usernameField, username);
    this.typeText(this.selectors.passwordField, password);
    this.clickElement(this.selectors.submitButton);
    return this;
  }

  verifyLoginSuccess() {
    this.shouldBeVisible(this.selectors.logoutButton);
    return this;
  }
} 