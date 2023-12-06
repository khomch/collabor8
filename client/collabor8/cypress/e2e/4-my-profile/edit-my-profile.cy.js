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

describe("test my profile page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[type="submit"]').click();
  });

  it("should check load and update my profile sucessfully", () => {
    cy.visit("http://localhost:3000/profile");
    cy.get(".user__items .h6").should("contain.text", "testuser");

    cy.get(".profile__btn").should("be.visible").click();
  });
});
