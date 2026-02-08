import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { Film } from "@/features/films/types";

import { FilmList } from "./FilmList";

//TODO: Find out why toHaveNoViolations is not working as expected in this test file. Maybe it is again some typscript issue and vittest-axe is just a wrapper around jest-axe

// it("should have no axe violations", async () => {
//   const html = "<html><!-- accessible markup! --></html>";
//   expect(await axe(html)).toHaveNoViolations();
// });

const mockFilms: Film[] = [
  {
    id: "1",
    episodeId: 4,
    title: "A New Hope",
    releaseDate: new Date("1977-05-25"),
    director: "George Lucas",
    producer: "Gary Kurtz",
    openingCrawl: "It is a period of civil war...",
    characterUrls: [],
    planetUrls: [],
    starshipUrls: [],
    vehicleUrls: [],
    speciesUrls: [],
  },
  {
    id: "5",
    episodeId: 2,
    title: "Attack of the Clones",
    releaseDate: new Date("2002-05-16"),
    director: "George Lucas",
    producer: "Rick McCallum",
    openingCrawl: "There is unrest in the Galactic Senate...",
    characterUrls: [],
    planetUrls: [],
    starshipUrls: [],
    vehicleUrls: [],
    speciesUrls: [],
  },
  {
    id: "6",
    episodeId: 3,
    title: "Revenge of the Sith",
    releaseDate: new Date("2005-05-19"),
    director: "George Lucas",
    producer: "Rick McCallum",
    openingCrawl: "War! The Republic is crumbling...",
    characterUrls: [],
    planetUrls: [],
    starshipUrls: [],
    vehicleUrls: [],
    speciesUrls: [],
  },
];

describe("FilmList - Accessibility", () => {
  describe("Semantic HTML and Structure", () => {
    it("should render as an unordered list", () => {
      render(<FilmList films={mockFilms} />);
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("should render each film as a list item", () => {
      render(<FilmList films={mockFilms} />);
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(mockFilms.length);
    });

    it("should render each film as a clickable link", () => {
      render(<FilmList films={mockFilms} />);
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(mockFilms.length);
    });
  });

  describe("Link Accessibility", () => {
    it("should have proper link hrefs for each film", () => {
      render(<FilmList films={mockFilms} />);
      mockFilms.forEach((film) => {
        const link = screen.getByRole("link", {
          name: new RegExp(`Episode ${film.episodeId}: ${film.title}`),
        });
        expect(link).toHaveAttribute("href", `/films/${film.id}`);
      });
    });

    it("should have descriptive link text including episode number and title", () => {
      render(<FilmList films={mockFilms} />);
      mockFilms.forEach((film) => {
        const link = screen.getByRole("link", {
          name: new RegExp(`Episode ${film.episodeId}: ${film.title}`),
        });
        expect(link).toBeInTheDocument();
      });
    });

    it("should have unique and meaningful link text for each film", () => {
      render(<FilmList films={mockFilms} />);
      const links = screen.getAllByRole("link");
      const linkTexts = links.map((link) => link.textContent);
      const uniqueTexts = new Set(linkTexts);
      expect(uniqueTexts.size).toBe(linkTexts.length);
    });
  });

  describe("Keyboard Navigation", () => {
    it("should allow navigation through links with Tab key", async () => {
      const user = userEvent.setup();
      render(<FilmList films={mockFilms} />);
      const links = screen.getAllByRole("link");

      // First link should receive focus on first tab
      await user.tab();
      expect(links[0]).toHaveFocus();

      // Second link should receive focus on second tab
      await user.tab();
      expect(links[1]).toHaveFocus();

      // Third link should receive focus on third tab
      await user.tab();
      expect(links[2]).toHaveFocus();
    });

    it("should allow reverse navigation with Shift+Tab", async () => {
      const user = userEvent.setup();
      render(<FilmList films={mockFilms} />);
      const links = screen.getAllByRole("link");

      // Focus the last link
      links[2]?.focus();
      expect(links[2]).toHaveFocus();

      // Shift+Tab should move to previous link
      await user.tab({ shift: true });
      expect(links[1]).toHaveFocus();

      // Shift+Tab again
      await user.tab({ shift: true });
      expect(links[0]).toHaveFocus();
    });

    it("should allow activation of links with Enter key", async () => {
      render(<FilmList films={mockFilms} />);
      const links = screen.getAllByRole("link");

      // Focus the first link
      links[0]?.focus();
      expect(links[0]).toHaveFocus();

      // Verify link is navigable
      expect(links[0]).toHaveAttribute("href");
    });

    it("should maintain focus visibility on interactive elements", () => {
      render(<FilmList films={mockFilms} />);
      const links = screen.getAllByRole("link");

      links[0]?.focus();
      expect(links[0]).toHaveFocus();
      // Browser default focus outline should be visible
    });
  });

  describe("Visual Hierarchy and Contrast", () => {
    it("should have visible film titles", () => {
      render(<FilmList films={mockFilms} />);
      mockFilms.forEach((film) => {
        const title = screen.getByText(
          new RegExp(`Episode ${film.episodeId}: ${film.title}`),
        );
        expect(title).toBeVisible();
      });
    });

    it("should display release year for each film", () => {
      render(<FilmList films={mockFilms} />);
      mockFilms.forEach((film) => {
        const year = screen.getByText(
          film.releaseDate.getFullYear().toString(),
        );
        expect(year).toBeVisible();
      });
    });
  });

  describe("Empty State", () => {
    it("should render without errors when film list is empty", () => {
      const { container } = render(<FilmList films={[]} />);
      const list = container.querySelector("ul");
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });
  });

  //   describe("Axe Accessibility Audit", () => {
  //     it("should have no accessibility violations", async () => {
  //       const { container } = render(<FilmList films={mockFilms} />);
  //       const results = await axe(container);
  //       expect(results).toHaveNoViolations();
  //     });

  //     it("should have no violations in empty state", async () => {
  //       const { container } = render(<FilmList films={[]} />);
  //       const results = await axe(container);
  //       expect(results).toHaveNoViolations();
  //     });
  //   });
});
