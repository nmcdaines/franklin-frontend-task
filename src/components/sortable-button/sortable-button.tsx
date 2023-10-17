import cx from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { VisibleIcon } from "@/icons/visible-icon";
import { HiddenIcon } from "@/icons/hidden-icon";
import { XIcon } from "@/icons/x-icon";
import { useFocus } from "@/context/focus-context";
import { ExtraSmallText, SmallText } from "@/components/typography/typography";
import { BookType } from "@/data/types";
import { useData } from "@/context/data-context";
import styles from "./sortable-button.module.css";

interface EmptyDropTargetProps {
  id: string;
}

export function EmptyDropTarget({ id }: EmptyDropTargetProps) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: id,
    data: {},
    disabled: true,
  });

  return (
    <div
      ref={setNodeRef}
      className={styles.empty}
      {...listeners}
      {...attributes}
    >
      <SmallText>Empty</SmallText>
    </div>
  );
}

interface SortableButtonBaseProps {
  book: BookType;
  buttonProps?: any;
  isDragging?: boolean;
  onDelete?: Function;
}

export function SortableButtonBase({
  book,
  buttonProps = {},
  isDragging,
  onDelete = () => {},
}: SortableButtonBaseProps) {
  const { title, author, isHidden } = book;
  const IconComponent = isHidden ? HiddenIcon : VisibleIcon;

  return (
    <button
      {...buttonProps}
      className={cx(
        styles.button,
        isHidden ? styles.solid : styles.gradient,
        isDragging && styles.placeholder
      )}
    >
      <span className={styles["visibility-icon"]}>
        <IconComponent />
      </span>
      <span className={styles.content}>
        <SmallText bold strikeThrough={isHidden}>
          {title}
        </SmallText>
        <ExtraSmallText bold strikeThrough={isHidden}>
          {author}
        </ExtraSmallText>
      </span>
      <span className={styles.delete} onClick={() => onDelete()}>
        <XIcon />
      </span>
    </button>
  );
}

interface SortableButtonDraggableProps extends SortableButtonBaseProps {}

export function SortableButtonDraggable({
  book,
}: SortableButtonDraggableProps) {
  const { id } = book;
  const { setFocusedId } = useFocus();
  const { deleteItem } = useData();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { ...book },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableButtonBase
      buttonProps={{
        ref: setNodeRef,
        ...listeners,
        ...attributes,
        style,
        onMouseOver: () => setFocusedId(id),
      }}
      book={book}
      isDragging={isDragging}
      onDelete={() => deleteItem(id)}
    />
  );
}
