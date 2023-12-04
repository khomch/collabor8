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

    cy.get('[name="email"]').type("test1@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("should click start new project button sucessfully", () => {
    cy.contains(".button", "Start new project").click();
    cy.url().should("include", "/project-settings/new");
  });

  it("should create new project sucessfully", () => {
    cy.visit("http://localhost:3000/project-settings/new");

    cy.get('[name="title"]').type("My Awesome Project");
    cy.get('[name="link"]')
      .first()
      .type("https://github.com/myusername/myproject");
    cy.get('[name="aboutProject"]').type("A short sentence about the project");
    cy.get('[name="estimatedDeadline"]').type("2023-12-31T23:59");
    cy.get('.manage-project__select-label:contains("Type") + select').select(
      "New project"
    );

    cy.get('.manage-project__select-label:contains("Level") + select').select(
      "Junior level"
    );
    cy.get('[name="description"]').type("A short description of the project");
    cy.get('[name="additionalInfo"]').type(
      "Any additional information about the project"
    );

    cy.get('.manage-project__two-inputs [name="name"]').type("Slack Group");
    cy.get('.manage-project__two-inputs [name="link"]').type(
      "https://slack.com/myworkspace"
    );

    cy.get('button[type="submit"]').click();
  });

  it("should be visible created project on the dashboard", () => {
    cy.visit("http://localhost:3000/dashboard");

    cy.get(".project-card__title").should("contain.text", "My Awesome Project");
  });
});
