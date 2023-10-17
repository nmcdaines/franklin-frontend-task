import { ResetIcon } from "@/icons/reset-icon";
import styles from "./reset-button.module.css";

interface ResetButtonProps {
  onClick: Function;
}

export function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button className={styles["reset-button"]} onClick={() => onClick()}>
      <span className={styles["icon-button"]}>
        <ResetIcon />
      </span>
      <span className={styles["button-text"]}>Reset</span>
    </button>
  );
}
