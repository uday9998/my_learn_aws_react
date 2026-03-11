import React, { useEffect, useRef, useState } from 'react';
import {
   SortableContainer as Container,
   SortableElement as Element,
   SortableHandle,
} from 'react-sortable-hoc';
import Icon from 'components/elements/Icon';

const SortableContainer = Container(({ children }) => {
   return <>{children}</>;
});

export const SortableList = ({ children, ...rest }) => {
   const containerRef = useRef(null);
   const [containerEl, setContainerEl] = useState(document.body);
   useEffect(() => {
      setContainerEl(containerRef.current);
   }, [containerRef.current]);
   return (
      <SortableContainer helperContainer={ containerEl } useDragHandle { ...rest }>
         <div ref={ containerRef }>
            {children}
         </div>
      </SortableContainer>
   );
};

export const SortableElement = Element(({ children, ...rest }) => {
   return (
      React.cloneElement(children, { ...rest, style: { zIndex: 9999 } })
   );
});

export const DragHandle = SortableHandle(() => (
   <Icon name='Dragdrop' />
));
