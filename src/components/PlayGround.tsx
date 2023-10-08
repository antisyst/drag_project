import  { useState, useRef, MouseEvent, CSSProperties } from 'react';
import Buttons from "./Buttons";
import { CategoryManager } from "./MindMap";


const PlayGround = () => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const categoryManagerRef = useRef<HTMLDivElement>(null);


  const [scale, setScale] = useState(1);

  const increaseScale = () => {
    if (scale < 1.5) {
      setScale(scale + 0.1);
    }
  };

  const decreaseScale = () => {
    if (scale > 0.5) {
      setScale(scale - 0.1);
    }
  };


  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging && categoryManagerRef.current) {
      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;

      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY,
      });

      setStartPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className='scale_buttons'>
        <button onClick={decreaseScale}>-</button>
        <span>{Math.round((scale - 0.5) * 100)}%</span>
        <button onClick={increaseScale}>+</button>
      </div>
      <Buttons />
      <div className='transform_cc'>
          <div
            ref={categoryManagerRef}
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              cursor: dragging ? 'grabbing' : 'grab',
            } as CSSProperties} 
          >
              <div
                  style={{
                    width: '100px',  
                    height: '100px', 
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }}
                   >
               <CategoryManager />
               </div>
          </div>
      </div>
    </div>
  );
};

export default PlayGround;
