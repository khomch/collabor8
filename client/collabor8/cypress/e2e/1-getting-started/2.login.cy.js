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

describe("test register page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should login sucessfully", () => {
    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("should display error message with fail login", () => {
    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="password"]').type("password12345");

    cy.get('[type="submit"]').click();

    cy.get(".login-form__error").should("exist");
  });
});
