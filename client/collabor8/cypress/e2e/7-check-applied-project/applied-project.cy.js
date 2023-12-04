/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("test finished project ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get('[name="email"]').type("test@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[type="submit"]').click();
  });

  it("should check the project new user applied sucessfully", () => {
    cy.visit("http://localhost:3000/projects");

    cy.get(".projects-page__subtitle h2").should(
      "contain.text",
      "Team member in"
    );

    cy.get(".project-card__title").should("contain.text", "My Awesome Project");
  });
});
