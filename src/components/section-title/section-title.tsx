import { SmallText } from "@/components/typography/typography";
import styles from "./section-title.module.css";

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className={styles.wrapper}>
      <hr className={styles.divider} data-testid="hr" />
      <SmallText element="span" className={styles.title}>
        {title}
      </SmallText>
    </div>
  );
}
