// cypress/e2e/signin.spec.ts

describe("Signin Page", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("should display the signin form", () => {
    cy.get("h1").should("contain.text", "Sign in");
    cy.get("form").should("be.visible");
  });

  it("should allow a user to sign in successfully", () => {
    // Mock the API response for successful sign-in
    cy.intercept("POST", `${Cypress.env("API_ENDPOINT")}/users/sign_in`, {
      statusCode: 200,
      body: {
        auth_token: "mock-auth-token",
        user: { id: 1, name: "John Doe", email: "john.doe@example.com" },
      },
    }).as("signinRequest");

    // Fill in the form and submit
    cy.get("input#email").type("johndoe@example.com");
    cy.get("input#password").type("password123");
    cy.get('button[type="submit"]').click();

    // Wait for the API request and check the response status code
    cy.wait("@signinRequest").then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });

    // Check if the user is redirected
    cy.url().should("include", "/account");

    // Check if the authToken cookie is set

    // Verify that userData is correctly set in localStorage
    cy.window().then((win) => {
      const userData = win.localStorage.getItem("userData");
      expect(userData).to.exist;
      expect(JSON.parse(userData)).to.deep.equal({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      });
    });
  });

  it("should display error message for invalid sign-in", () => {
    // Mock the API response for failed sign-in
    cy.intercept("POST", `${Cypress.env("API_ENDPOINT")}/users/sign_in`, {
      statusCode: 401,
      body: { error: "Invalid username or password" },
    }).as("signinRequest");

    // Fill in the form with invalid credentials and submit
    cy.get("input#email").type("invalid@example.com");
    cy.get("input#password").type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Wait for the API request and check the response status code
    cy.wait("@signinRequest").then(({ response }) => {
      expect(response.statusCode).to.equal(401);
    });

    // Verify that the error message is displayed
    cy.get("div.text-red-500").should(
      "contain.text",
      "Sign-in failed: Invalid username or password"
    );
  });

  it("should navigate to signup page when link is clicked", () => {
    // Click the 'Don't have an account? Create an account.' link
    cy.get("a").contains("Don't have an account? Create an account.").click();

    // Verify that the URL changes to the signup page
    cy.url().should("include", "/signup");
  });
});
