import { useMemo } from "react";
import Image from "next/image";
import { useFocus } from "@/context/focus-context";
import { BookType } from "@/data/types";
import { SmallText, TitleText } from "@/components/typography/typography";
import styles from "./book-details.module.css";

interface BookDetailsProps {
  books: BookType[];
}

export function BookDetails({ books }: BookDetailsProps) {
  const { focusedId } = useFocus();

  const book = useMemo(
    () => books.find(({ id }) => id === focusedId),
    [focusedId, books]
  );

  if (!book) {
    return null;
  }

  return (
    <main className={styles.container}>
      <div className="image">
        <Image
          className="image"
          src={book?.imageUrl}
          width={233}
          height={263}
          quality={80}
          loading="lazy"
          alt={`Book cover for ${book.title} by ${book.author}`}
        />
        <div className="overlay" />
      </div>
      <div className={styles["book-header"]}>
        <TitleText className={styles["title"]}>{book?.title}</TitleText>
        <SmallText bold className={styles["author"]}>
          {book?.author}
        </SmallText>
      </div>

      <div>
        <SmallText bold className={styles["summary-title"]}>
          Publisher&apos;s Summary
        </SmallText>
        <SmallText className={styles["summary"]}>
          {book?.publisherSummary}
        </SmallText>
      </div>
    </main>
  );
}
