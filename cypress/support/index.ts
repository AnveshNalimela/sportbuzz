Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  if (err.message.includes("Cannot use import statement outside a module")) {
    return false;
  }
  return true;
});
