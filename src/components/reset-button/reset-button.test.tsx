/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { ResetButton } from "./reset-button";

describe("ResetButton", () => {
  let props: any;

  beforeEach(() => {
    props = { onClick: jest.fn() };
  });

  const subject = () => render(<ResetButton {...props} />);

  it("renders reset button text", () => {
    subject();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("renders reset icon", () => {
    subject();
    expect(screen.getByTestId("reset-icon")).toBeInTheDocument();
  });

  describe("reset button clicked", () => {
    it("calls onClick function", () => {
      subject();
      fireEvent.click(screen.getByRole("button", { name: "Reset" }));
      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
