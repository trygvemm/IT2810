/// <reference types="cypress"/>

describe("Book page testing", () => {
  beforeEach(() => {
    cy.log("I run before each test in Book file");
    cy.visit("http://localhost:3000");
    cy.get("[tabindex='10'] > :nth-child(1)").click();
  });

  describe("Test wikipedia link", () => {
    it("Wikipedia link", () => {
      cy.get("#wikipedia").click();
      cy.url().should("eq", "https://en.wikipedia.org/wiki/Things_Fall_Apart");
    });
  });

  describe("Test write string to database", () => {
    it("Writing to database", () => {
      cy.get("#commentTextArea").type("Comment from cypress test");
      cy.get("#commentSubmitButton").click();
      cy.get("#feedbackPopup").should(
        "have.text",
        "Your comment has been submitted!"
      );
      cy.get(".mt-20 > .flex > :nth-child(1)").should(
        "have.text",
        "Comment from cypress test"
      );
    });
  });

  describe("Test return to home page", () => {
    it("Returning to home page", () => {
      cy.get("#homeButton").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });

  describe("Test write empty string to database", () => {
    it("Writing to database", () => {
      cy.get("#commentSubmitButton").click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Cannot post empty comment!");
      });
    });
  });
});
