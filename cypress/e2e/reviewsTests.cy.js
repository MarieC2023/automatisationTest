import { login } from "../services/apiAuth";  
import { addReview } from "../services/apiReviews";


describe("Test sur l'ajout d'avis", () => {
  let authToken;

  beforeEach(() => {
    login("test2@test.fr", "testtest").then((response) => {
      expect(response.status).to.eq(200);
      authToken = Cypress.env("authToken"); 
    });
  });

  it("L'avis est ajouté si tous les champs sont correctement remplis", () => {
    addReview(authToken, "chouette", "mais le prix ça pique", 2).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("L'avis n'est pas ajouté si des champs sont manquants", () => {
    addReview(authToken, "chouette", "", 2).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
    });
  });

  it("Test un risque de faille XSS", () => {
    const testXSS = `<script>alert("XSS");</script>`;

    addReview(authToken, "test XSS", testXSS, 5).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
    });
  });
});
