import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useCallback,
} from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { BookType } from "@/data/types";
import sourceBooks from "@/data/books.json";

const DataContext = createContext<{
  books: BookType[];
  listChanged: boolean;
  resetBooks: Function;
  moveItem: Function;
  setBooks: Function;
  deleteItem: Function;
  updateActiveItemSection: Function;
}>({
  books: [],
  listChanged: false,
  resetBooks: () => {},
  moveItem: () => {},
  setBooks: () => {},
  deleteItem: () => {},
  updateActiveItemSection: () => {},
});

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [books, setBooks] = useState<BookType[]>([...sourceBooks]);
  const listChanged = JSON.stringify(books) !== JSON.stringify(sourceBooks);
  const resetBooks = useCallback(() => {
    setBooks([...sourceBooks]);
  }, []);

  const moveItem = useCallback(
    (activeId: string, overId: string) => {
      setBooks((items) => {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    },
    [setBooks]
  );

  const deleteItem = useCallback(
    (id: string) => {
      setBooks((items) => {
        return items.filter((item) => item.id !== id);
      });
    },
    [setBooks]
  );

  const updateActiveItemSection = useCallback(
    (activeId: string, overContainerId: string) => {
      setBooks((items) => {
        return items.map((item) =>
          item.id === activeId
            ? { ...item, isHidden: overContainerId === "hidden-section" }
            : item
        );
      });
    },
    [setBooks]
  );

  return (
    <DataContext.Provider
      value={{
        books,
        listChanged,
        resetBooks,
        moveItem,
        setBooks,
        deleteItem,
        updateActiveItemSection,
      }}
    >
      <>{children}</>
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (typeof context === undefined) {
    throw new Error("useData must be used within an DataProvider");
  }
  return context;
};
