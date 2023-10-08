import React, { useState, useRef, DragEvent } from 'react';

interface Item {
  type: string;
  id: number;
}

interface DraggableContainerProps {
  items: Item[];
}

const DraggableContainer: React.FC<DraggableContainerProps> = ({ items }) => {
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragEvent, item: Item) => {
    setDraggedItem(item);
    event.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    if (draggedItem) {
      const droppedItem = JSON.parse(event.dataTransfer.getData('application/json')) as Item;

      console.log('Dropped item:', droppedItem);

      setDraggedItem(null);
    }
  };

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ border: '1px solid #ccc', padding: '16px' }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(event) => handleDragStart(event, item)}
          style={{
            border: '1px solid #ddd',
            padding: '8px',
            marginBottom: '8px',
            cursor: 'move',
            opacity: draggedItem && draggedItem.id === item.id ? 0.5 : 1,
          }}
        >
          {item.type}-{item.id}
        </div>
      ))}
    </div>
  );
};

export default DraggableContainer;
