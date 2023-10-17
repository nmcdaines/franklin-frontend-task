import cx from "classnames";
import styles from "./typography.module.css";

type HtmlElement = "h1" | "div" | "span";

interface ExtraSmallTextProps {
  element?: HtmlElement;
  children: any;
  className?: string;
  bold?: boolean;
  strikeThrough?: boolean;
}

export function ExtraSmallText({
  element: Element = "div",
  children,
  className,
  bold,
  strikeThrough,
}: ExtraSmallTextProps) {
  return (
    <Element
      className={cx(
        styles.typography,
        styles["extra-small"],
        className,
        bold && styles.bold,
        strikeThrough && styles["strike-through"]
      )}
    >
      {children}
    </Element>
  );
}

interface SmallTextProps {
  element?: HtmlElement;
  children: any;
  className?: string;
  bold?: boolean;
  strikeThrough?: boolean;
}

export function SmallText({
  element: Element = "div",
  children,
  className,
  bold,
  strikeThrough,
}: SmallTextProps) {
  return (
    <Element
      className={cx(
        styles.typography,
        styles.small,
        className,
        bold && styles.bold,
        strikeThrough && styles["strike-through"]
      )}
    >
      {children}
    </Element>
  );
}

interface HeadingTextProps {
  element?: HtmlElement;
  children: any;
  className?: string;
}

export function HeadingText({
  element: Element = "div",
  children,
  className,
}: HeadingTextProps) {
  return (
    <Element
      className={cx(styles.typography, styles.heading, styles.bold, className)}
    >
      {children}
    </Element>
  );
}

interface TitleTextProps {
  element?: HtmlElement;
  children: any;
  className?: string;
}

export function TitleText({
  element: Element = "div",
  children,
  className,
}: TitleTextProps) {
  return (
    <Element
      className={cx(styles.typography, styles.title, styles.bold, className)}
    >
      {children}
    </Element>
  );
}
