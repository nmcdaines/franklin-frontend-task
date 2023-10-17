import { BookType } from "@/data/types";
import { SectionTitle } from "@/components/section-title/section-title";
import { ResetButton } from "@/components/reset-button/reset-button";
import {
  ExtraSmallText,
  HeadingText,
  SmallText,
} from "@/components/typography/typography";
import { DroppableArea } from "@/components/droppable-area/droppable-area";
import { useData } from "@/context/data-context";
import styles from "./book-list.module.css";

interface BookListProps {
  books: BookType[];
}

export function BookList({ books }: BookListProps) {
  const { listChanged, resetBooks } = useData();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SmallText bold>Shopping</SmallText>
        <div className={styles.row}>
          <HeadingText element="h1">Wish list</HeadingText>
          <ExtraSmallText className={styles.tag}>Books</ExtraSmallText>
        </div>
      </header>
      <nav>
        <DroppableArea
          areaName="visible-section"
          items={processItems(
            "visible",
            books?.filter((item) => !item.isHidden)
          )}
        />
        <SectionTitle title="Hidden list" />
        <DroppableArea
          areaName="hidden-section"
          items={processItems(
            "hidden",
            books?.filter((item) => item.isHidden)
          )}
        />
        <div className={styles.spacer} />
        {listChanged && <ResetButton onClick={resetBooks} />}
      </nav>
    </div>
  );
}

function processItems(location: string, items: any) {
  if (items.length === 0) {
    return [{ id: `${location}-empty`, placeholder: true }];
  }

  return items;
}
