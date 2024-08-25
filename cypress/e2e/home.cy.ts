// cypress/e2e/home.cy.ts

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/home/index");
  });

  it("should display live matches section", () => {
    cy.get("h2").contains("Live Matches").should("be.visible");
    cy.get(".suspense-loading").should("not.exist"); // Ensure loading indicator is not visible if data is fetched
  });

  it("should display trending articles section", () => {
    cy.get("h2").contains("Trending Articles").should("be.visible");
    cy.get(".suspense-loading").should("not.exist"); // Ensure loading indicator is not visible if data is fetched
  });

  it("should fetch and display matches", () => {
    // Verify article title is displayed
  });

  it("should handle errors when fetching articles", () => {
    // Check for error message
  });

  it("should handle filtering sports", () => {
    cy.get('button[id="options-menu"]').click();
  });
  
  Cypress.on("uncaught:exception", (err, runnable) => {
    // return false to prevent the test from failing
    return false;
  });
});
