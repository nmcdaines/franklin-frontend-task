import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  EmptyDropTarget,
  SortableButtonDraggable,
} from "@/components/sortable-button/sortable-button";
import styles from "@/components/droppable-area/droppable-area.module.css";

interface PlaceholderType {
  id: string;
  placeholder: boolean;
}

interface DroppableAreaProps {
  areaName: string;
  items: any[]; // TODO: ideally shouldn't use any
}

export function DroppableArea({ areaName, items }: DroppableAreaProps) {
  return (
    <section className={styles["button-list"]}>
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        id={areaName}
      >
        {items?.map(({ placeholder, ...item }) =>
          placeholder ? (
            <EmptyDropTarget key={item.id} id={item.id} />
          ) : (
            <SortableButtonDraggable key={item.id} book={item} />
          )
        )}
      </SortableContext>
    </section>
  );
}
