//ici je veux testser la page de connexion
// 1 cliquez sur le bouton de connexion
// 2 affichage de la page avec le formulaire
// 3 entrez les info de connexion email + mdp
// 4 être rediriger vers page accueil - affichage du bouton panier


describe("Connexion de l'utilisateur", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit("baseUrl");
      });

    it("Présence des champs de saisie et du bouton de connexion", () => {
      
      cy.getBySel("nav-link-login").click();
    
    });
  });
  