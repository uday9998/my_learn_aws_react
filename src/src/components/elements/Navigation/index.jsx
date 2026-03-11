import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const NavProvider = createContext({
   activeGroup: '',
   changeGroup: () => {},
});

const Navigation = ({ children }) => {
   let group = [];
   group = children.filter(value => value?.type?.displayName === 'Group');
   const activeValue = group.find(v => {
      const child = v.props.children;
      if (child.find(value => value && value.props.active)) {
         return v;
      }
      return false;
   });
   const activeGroupTitel = activeValue ? activeValue.props.title : null;
   const [activeGroup, setactiveGroup] = useState(activeGroupTitel);

   const onChangeGroup = (title, isPageBuilder) => {
      if (title === activeGroup && !isPageBuilder) {
         setactiveGroup(null);
      } else {
         setactiveGroup(title);
      }
   };


   return (
      <NavProvider.Provider
         value={ {
            activeGroup,
            changeGroup: onChangeGroup,
         } }
      >
         {children}
      </NavProvider.Provider>
   );
};

Navigation.Provider = NavProvider;
Navigation.propTypes = {
   children: PropTypes.any,
};

export default Navigation;
