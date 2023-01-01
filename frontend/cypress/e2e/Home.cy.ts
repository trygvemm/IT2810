/// <reference types="cypress"/>

describe("Home page testing", () => {
  beforeEach(() => {
    cy.log("I run before each test in Home file");
    cy.visit("http://localhost:3000");
  });

  describe("Check author filtering", () => {
    it("Sort authors by first in alphabetical order", () => {
      cy.get(".w-64").click();

      cy.get('[tabindex="10"] > :nth-child(1)').should(
        "have.text",
        "Albert Camus"
      );
    });
    it("Sort authors by last in alphabetical order", () => {
      cy.get(".w-64").click();
      cy.get(".w-64").click();
      cy.get('[tabindex="10"] > :nth-child(1)').should(
        "have.text",
        "Yasunari Kawabata"
      );
    });
  });

  describe("Check title filtering", () => {
    it("Sort titles by first in alphabetical order", () => {
      cy.get(".w-96").click();
      cy.get('[tabindex="10"] > :nth-child(2)').should(
        "have.text",
        "A Doll's House"
      );
    });
    it("Sort titles by last in alphabetical order", () => {
      cy.get(".w-96").click();
      cy.get(".w-96").click();
      cy.get('[tabindex="10"] > :nth-child(2)').should(
        "have.text",
        "Zorba the Greek"
      );
    });
  });

  describe("Check year filtering", () => {
    it("Sort by oldest to newest book", () => {
      cy.get('[tabindex="8"]').click();
      cy.get('[tabindex="10"] > :nth-child(3)').should("have.text", "-1700");
    });
    it("Sort by newest to oldest book", () => {
      cy.get('[tabindex="8"]').click();
      cy.get('[tabindex="8"]').click();
      cy.get('[tabindex="10"] > :nth-child(3)').should("have.text", "1995");
    });
  });

  describe("Check language filtering", () => {
    it("Sort languages by first in alphabetical order", () => {
      cy.get('[tabindex="9"]').click();
      cy.get('[tabindex="10"] > :nth-child(4)').should("have.text", "Akkadian");
    });
    it("Sort languages by last in alphabetical order", () => {
      cy.get('[tabindex="9"]').click();
      cy.get('[tabindex="9"]').click();
      cy.get('[tabindex="10"] > :nth-child(4)').should("have.text", "Swedish");
    });
  });

  describe("Test sliders input fields", () => {
    it("Test with year -1000 and 1000", () => {
      cy.get("#minInput").clear().type("-1000{enter}");
      cy.wait(100);
      cy.get("#maxInput").clear().type("1000{enter}");
      cy.wait(100);
      cy.get("[tabindex='10'] > :nth-child(2)").should(
        "have.text",
        "The Book Of Job"
      );
    });
  });

  describe("Test search function", () => {
    it("Searching for books containing 'The Idiot'", () => {
      cy.get("#searchInput").type("The Idiot");
      cy.get("#searchButton").click();
      cy.get("[tabindex='10'] > :nth-child(2)").should(
        "have.text",
        "The Idiot"
      );
    });
  });

  describe("Test select language", () => {
    it("Selecting Any books", () => {
      cy.get("#langSelect").select("Italian");
      cy.get("#langSelect").select("Any");
      cy.get("#langSelect").should("have.value", "Any");
    });
    it("Selecting Italian books", () => {
      cy.get("#langSelect").select("Italian");
      cy.get("#langSelect").should("have.value", "Italian");
    });
    it("Selecting English books", () => {
      cy.get("#langSelect").select("English");
      cy.get("#langSelect").should("have.value", "English");
    });
    it("Selecting French books", () => {
      cy.get("#langSelect").select("French");
      cy.get("#langSelect").should("have.value", "French");
    });
    it("Selecting Arabic books", () => {
      cy.get("#langSelect").select("Arabic");
      cy.get("#langSelect").should("have.value", "Arabic");
    });
  });

  describe("Test if user is rerouted when clicking on a book", () => {
    it("User is rerouted", () => {
      cy.get("[tabindex='10'] > :nth-child(1)").click();
      cy.wait(400);
      cy.get("#title").should("have.text", "Things Fall Apart");
    });
  });

  describe("Test from launch to book site through search", () => {
    it("Searching for the book 'The Idiot' and going to its infosite", () => {
      cy.get("#searchInput").type("The Idiot");
      cy.get("#searchButton").click();
      cy.get("[tabindex='10'] > :nth-child(2)").should(
        "have.text",
        "The Idiot"
      );
    });
  });

  describe("Select Italian language and the top book", () => {
    it("Selecting the top book", () => {
      cy.get("#langSelect").select("Italian");
      cy.get("#langSelect").should("have.value", "Italian");
      cy.get("[tabindex='10'] > :nth-child(2)").should(
        "have.text",
        "The Divine Comedy"
      );
    });
  });

  describe("Test infinite scroll functionality", () => {
    it("Scroll to bottom and click the last book displayed", () => {
      cy.get(":nth-child(20) > :nth-child(1)").scrollIntoView();
      cy.get(":nth-child(40) > :nth-child(1)").scrollIntoView();
      cy.get(":nth-child(60) > :nth-child(1)").scrollIntoView();
      cy.get(":nth-child(80) > :nth-child(1)").scrollIntoView();
      cy.get(":nth-child(100) > :nth-child(1)").scrollIntoView();
      cy.get(":nth-child(100) > :nth-child(2)").should(
        "have.text",
        "Memoirs of Hadrian"
      );
    });
  });
});
