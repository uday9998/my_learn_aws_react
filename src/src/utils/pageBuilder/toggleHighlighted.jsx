const toggleHighlighted = (event, active, action) => {
   event.preventDefault();
   event.stopPropagation();
   if (event.nativeEvent) {
      event.nativeEvent.stopImmediatePropagation();
   }
   if (action === 'enter') {
      return true;
   } if (action === 'leave') {
      return false;
   }
   return !active;
};

export default toggleHighlighted;
