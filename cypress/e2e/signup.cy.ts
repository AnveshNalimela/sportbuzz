describe("Signup Page intergartion tests", () => {
  beforeEach(() => {
    // Visit the signup page before each test
    cy.visit("/signup");
  });

  it("should display signup form", () => {
    // Check if the signup form is displayed
    cy.get("h1").should("contain.text", "Sign up");
    cy.get("form").should("exist");
    cy.get("input#name").should("exist");
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
    cy.get('button[type="submit"]').should("contain.text", "Sign up");
  });

  it("should submit the form successfully and redirect", () => {
    // Mock the API response
    cy.intercept("POST", `${Cypress.env("API_ENDPOINT")}/users`, {
      statusCode: 200,
      body: {
        auth_token: "mock-auth-token",
        user: { id: 1, name: "John Doe", email: "johndoe@example.com" },
      },
    }).as("signupRequest");

    // Fill in the form and submit
    cy.get("input#name").type("John Doe");
    cy.get("input#email").type("johndoe@example.com");
    cy.get("input#password").type("password123");
    cy.get('button[type="submit"]').click();

    // Check if the API call was made
    cy.wait("@signupRequest").its("response.statusCode").should("eq", 200);

    // Check if the user is redirected
    cy.url().should("include", "/account");
  });

  it("should show validation errors for empty fields", () => {
    // Submit the form without filling in any fields
    cy.get('button[type="submit"]').click();

    // Check for validation errors
    cy.get("input#name").should("have.class", "border-red-500");
    cy.get("input#email").should("have.class", "border-red-500");
    cy.get("input#password").should("have.class", "border-red-500");
  });

  it("should navigate to signin page when link is clicked", () => {
    // Click on the signin link
    cy.get('a[href="/signin"]').click();

    // Check if the URL is updated
    cy.url().should("include", "/signin");
  });
});
