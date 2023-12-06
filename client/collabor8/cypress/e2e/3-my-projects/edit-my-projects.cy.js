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

describe("test my projects page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[type="submit"]').click();
    // cy.url().should("include", "/dashboard");
  });

  it("should check load my owner projects sucessfully", () => {
    cy.visit("http://localhost:3000/projects");
    cy.get(".projects-page__subtitle h2").should(
      "contain.text",
      "Project Owner"
    );

    cy.get(".project-card__title").should("contain.text", "My Awesome Project");
  });

  it("should check load projects detail sucessfully", () => {
    cy.get(".project-card__show_btn").should("be.visible").click();
    cy.get(".project-card__title").should("contain.text", "My Awesome Project");

    cy.url().should("include", "/projects-detail");
  });

  it("should update my projects info sucessfully", () => {
    cy.get(".project-card__edit-icon").should("be.visible").click();
    cy.get('button[type="submit"]').first().click();
  });
});
