/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import {
  ExtraSmallText,
  SmallText,
  HeadingText,
  TitleText,
} from "./typography";

const CHILDREN_CONTENT = Object.freeze(
  "The quick brown fox jumps over the lazy dog."
);

describe("ExtraSmallText", () => {
  let props: any;

  beforeEach(() => {
    props = {
      children: CHILDREN_CONTENT,
    };
  });

  const subject = () => render(<ExtraSmallText {...props} />);

  it("renders children supplied to component", () => {
    subject();
    expect(screen.getByText(CHILDREN_CONTENT)).toBeInTheDocument();
  });

  test.each(["typography", "extra-small"])(
    "renders component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
    }
  );

  test.each(["bold", "strike-through"])(
    "does not render component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).not.toHaveClass(className);
    }
  );

  describe("when the 'bold' prop is present", () => {
    beforeEach(() => {
      props.bold = true;
    });

    test.each(["bold"])("renders component with $s class name", (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
    });
  });

  describe("when the 'strikeThrough' prop is present", () => {
    beforeEach(() => {
      props.strikeThrough = true;
    });

    test.each(["strike-through"])(
      "renders component with $s class name",
      (className) => {
        subject();
        expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
      }
    );
  });
});

describe("SmallText", () => {
  let props: any;

  beforeEach(() => {
    props = {
      children: CHILDREN_CONTENT,
    };
  });

  const subject = () => render(<SmallText {...props} />);

  it("renders children supplied to component", () => {
    subject();
    expect(screen.getByText(CHILDREN_CONTENT)).toBeInTheDocument();
  });

  test.each(["typography", "small"])(
    "renders component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
    }
  );

  test.each(["bold", "strike-through"])(
    "does not render component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).not.toHaveClass(className);
    }
  );

  describe("when the 'bold' prop is present", () => {
    beforeEach(() => {
      props.bold = true;
    });

    test.each(["bold"])("renders component with $s class name", (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
    });
  });

  describe("when the 'strikeThrough' prop is present", () => {
    beforeEach(() => {
      props.strikeThrough = true;
    });

    test.each(["strike-through"])(
      "renders component with $s class name",
      (className) => {
        subject();
        expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
      }
    );
  });
});

describe("HeadingText", () => {
  let props: any;

  beforeEach(() => {
    props = {
      children: CHILDREN_CONTENT,
    };
  });

  const subject = () => render(<HeadingText {...props} />);

  it("renders children supplied to component", () => {
    subject();
    expect(screen.getByText(CHILDREN_CONTENT)).toBeInTheDocument();
  });

  test.each(["typography", "heading", "bold"])(
    "renders component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
    }
  );

  test.each(["strike-through"])(
    "does not render component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).not.toHaveClass(className);
    }
  );
});

describe("TitleText", () => {
  let props: any;

  beforeEach(() => {
    props = {
      children: CHILDREN_CONTENT,
    };
  });

  const subject = () => render(<TitleText {...props} />);

  it("renders children supplied to component", () => {
    subject();
    expect(screen.getByText(CHILDREN_CONTENT)).toBeInTheDocument();
  });

  test.each(["typography", "title", "bold"])(
    "renders component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).toHaveClass(className);
    }
  );

  test.each(["strike-through"])(
    "does not render component with $s class name",
    (className) => {
      subject();
      expect(screen.getByText(CHILDREN_CONTENT)).not.toHaveClass(className);
    }
  );
});
