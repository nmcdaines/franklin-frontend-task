/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { SectionTitle } from "./section-title";

describe("SectionTitle", () => {
  let props: any;

  beforeEach(() => {
    props = {
      title: "The quick brown fox jumps over the lazy dog.",
    };
  });

  const subject = () => render(<SectionTitle {...props} />);

  it("renders a horizontal rule", () => {
    subject();
    expect(screen.getByTestId("hr")).toBeInTheDocument();
  });

  it("renders the text", () => {
    subject();
    expect(
      screen.getByText("The quick brown fox jumps over the lazy dog.")
    ).toBeInTheDocument();
  });
});
