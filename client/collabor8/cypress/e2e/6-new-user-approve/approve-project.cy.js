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

describe("test new user approve ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[type="submit"]').click();
  });

  it("should approve new user sucessfully", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get(".project-card__show_btn").should("be.visible").click();
    cy.get(".profile-btn-card__approve").should("be.visible").click();
  });
});
