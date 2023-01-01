/// <reference types="cypress"/>

describe("Home page testing", () => {
  beforeEach(() => {
    cy.log("I run before each test in Full file");
    cy.visit("http://localhost:3000");
  });

  describe("Test from home to book page, and write a comment", () => {
    it("Accesing the book", () => {
      cy.get("#searchInput").type("The Idiot");
      cy.wait(20);
      cy.get("[tabindex='10'] > :nth-child(1)").click();
      cy.get("#commentTextArea").type(
        "Full test with cypress from home to book page"
      );
      cy.get("#commentSubmitButton").click();
    });
  });

  describe("Test from home to book page, and accessing wikipedia page", () => {
    it("Accesing the book", () => {
      cy.get("#searchInput").type("The Idiot");
      cy.get("#searchButton").click();
      cy.get("[tabindex='10'] > :nth-child(1)").click();
      cy.get(".hover\\:underline").click();
      cy.url().should("eq", "https://en.wikipedia.org/wiki/The_Idiot");
    });
  });

  describe("Test from home to book page, and returning to home page", () => {
    it("Accesing the The Idiot", () => {
      cy.get("#searchInput").type("The Idiot");
      cy.get("#searchButton").click();
      cy.wait(20);
      cy.get("[tabindex='10'] > :nth-child(2)").should(
        "have.text",
        "The Idiot"
      );
      cy.get("[tabindex='10'] > :nth-child(1)").click();
      cy.get("#homeButton").click();
    });
  });
});
