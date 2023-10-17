import { useState } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableButtonBase } from "@/components/sortable-button/sortable-button";
import { BookType } from "@/data/types";
import { FocusProvider } from "@/context/focus-context";
import { BookDetails } from "@/components/screens/book-details/book-details";
import { BookList } from "@/components/screens/book-list/book-list";
import { useData } from "@/context/data-context";

export default function Home() {
  const { books, moveItem, updateActiveItemSection } = useData();
  const [draggedItem, setDraggedItem] = useState<undefined | BookType>(
    undefined
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <FocusProvider>
      <DndContext
        sensors={sensors}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="app">
          <BookList books={books} />
          <BookDetails books={books} />
        </div>

        {draggedItem &&
          createPortal(
            <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
              <SortableButtonBase book={{ ...draggedItem, isHidden: false }} />
            </DragOverlay>,
            document?.body
          )}
      </DndContext>
    </FocusProvider>
  );

  function handleDragStart(event: any) {
    const { active } = event;
    setDraggedItem({
      id: active.id,
      ...active.data.current,
    });
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      moveItem(active.id, over.id);
    }
  }

  function handleDragOver(event: any) {
    const { active, over } = event;
    const activeContainerId = getContainerId(active);
    const overContainerId = getContainerId(over);

    if (activeContainerId !== overContainerId) {
      updateActiveItemSection(active.id, overContainerId);
    }
  }
}

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

function getContainerId(object: any) {
  return object?.data?.current?.sortable?.containerId;
}
