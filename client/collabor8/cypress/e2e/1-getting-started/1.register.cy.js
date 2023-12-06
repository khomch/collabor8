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
    cy.visit("http://localhost:3000/register");
  });

  it("should sign up new user", () => {
    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="username"]').type("testuser");
    cy.get('[name="firstname"]').type("John");
    cy.get('[name="lastname"]').type("Doe");
    cy.get('[name="password"]').type("password123");
    cy.get('[name="repeatPassword"]').type("password123");
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/profile");
    cy.get(".register-form__error").should("not.exist");
  });

  it("should display error message with invalid information", () => {
    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="username"]').type("testuser");
    cy.get('[name="firstname"]').type("John");
    cy.get('[name="lastname"]').type("Doe");
    cy.get('[name="password"]').type("password123");
    cy.get('[name="repeatPassword"]').type("invalid_repeat_password");

    cy.get('[type="submit"]').click();

    cy.get(".register-form__error").should("exist");
  });
});
