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

describe("test new user apply ", () => {
  beforeEach(() => {
    // [NEW USER PROCESS]

    // cy.visit("http://localhost:3000/register");
    // cy.get('[name="email"]').type("test2@example.com");
    // cy.get('[name="username"]').type("testuser2");
    // cy.get('[name="firstname"]').type("John");
    // cy.get('[name="lastname"]').type("Doe");
    // cy.get('[name="password"]').type("password123");
    // cy.get('[name="repeatPassword"]').type("password123");
    // cy.get('[type="submit"]').click();
    // cy.url().should("include", "/profile");
    // cy.get(".register-form__error").should("not.exist");

    cy.visit("http://localhost:3000/login");

    cy.get('[name="email"]').type("test2@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[type="submit"]').click();
  });

  it("should new user apply sucessfully", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get(".project-card__show_btn").should("be.visible").click();
    cy.get(".project-card__apply_btn").should("be.visible").click();
  });
});
