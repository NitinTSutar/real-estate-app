import { useEffect, useMemo, useRef, useState } from 'react';
import PropertyCard from './PropertyCard';

const CARD_HEIGHT = 470;
const GAP = 24;
const OVERSCAN_ROWS = 2;

const getColumnCount = (width) => {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const VirtualizedPropertyGrid = ({ properties }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const updateMeasurements = () => {
      setContainerWidth(element.clientWidth);
      setViewportHeight(element.clientHeight);
    };

    updateMeasurements();
    const resizeObserver = new ResizeObserver(updateMeasurements);
    resizeObserver.observe(element);
    window.addEventListener('resize', updateMeasurements);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    };
  }, []);

  const columnCount = getColumnCount(containerWidth);
  const rowCount = Math.ceil(properties.length / columnCount);
  const rowHeight = CARD_HEIGHT + GAP;
  const totalHeight = rowCount * rowHeight;

  const visibleRange = useMemo(() => {
    if (!viewportHeight) {
      return { startRow: 0, endRow: Math.min(rowCount, 6) };
    }

    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN_ROWS);
    const endRow = Math.min(
      rowCount,
      Math.ceil((scrollTop + viewportHeight) / rowHeight) + OVERSCAN_ROWS
    );
    return { startRow, endRow };
  }, [rowCount, rowHeight, scrollTop, viewportHeight]);

  const items = [];
  for (let rowIndex = visibleRange.startRow; rowIndex < visibleRange.endRow; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      const itemIndex = rowIndex * columnCount + columnIndex;
      const property = properties[itemIndex];
      if (!property) continue;

      const top = rowIndex * rowHeight;
      const leftPercent = (100 / columnCount) * columnIndex;
      const widthPercent = 100 / columnCount;

      items.push(
        <div
          key={property.id}
          className="absolute px-3"
          style={{
            top,
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
            height: CARD_HEIGHT,
          }}
        >
          <PropertyCard property={property} />
        </div>
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-[75vh] overflow-y-auto rounded-2xl"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div className="relative" style={{ height: totalHeight }}>
        {items}
      </div>
    </div>
  );
};

export default VirtualizedPropertyGrid;
