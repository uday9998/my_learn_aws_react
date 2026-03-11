/* eslint-disable import/no-cycle */
import React, {
   useContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import QueryParam from 'utils/QueryParams';

const TabProvider = React.createContext();

const TabSwitch = ({
   children, onSwitchTab, dataIsFetching, initialTab, hasParent, location,
}) => {
   const [activeTab, setActiveTab] = useState(initialTab);

   useEffect(() => {
      const currentHash = QueryParam.getHash();
      if (hasParent) {
         const nestedHash = currentHash.split('/')[1];

         if (nestedHash) {
            setActiveTab(nestedHash);
         } else {
            QueryParam.setHash(`${ currentHash }/${ initialTab }`);
         }
      } else if (currentHash) {
         const parentHash = currentHash.split('/')[0];
         if (onSwitchTab && window.innerWidth >= 1024) {
            onSwitchTab(currentHash);
         }
         setActiveTab(parentHash);
      } else {
         QueryParam.setHash(initialTab);
      }
   }, [initialTab, location]);

   const switchTab = (tabId) => {
      if (hasParent) {
         const parentHash = QueryParam.getHash().split('/')[0];

         QueryParam.setHash(`${ parentHash }/${ tabId }`);
         setActiveTab(tabId);
      } else {
         if (onSwitchTab) {
            onSwitchTab(tabId);
         }

         QueryParam.setHash(tabId);
         setActiveTab(tabId);
      }
   };


   return (
      <TabProvider.Provider value={ {
         activeTab, switchTab, dataIsFetching,
      } }
      >
         {children}
      </TabProvider.Provider>
   );
};

const Tab = ({ children }) => {
   const TabConsumer = useContext(TabProvider);

   const childrenArray = React.Children.map(children, (child) => {
      return React.cloneElement(child, { TabConsumer });
   });

   return (
      <>
         {childrenArray}
      </>
   );
};

const TabContent = ({ children }) => {
   const TabConsumer = useContext(TabProvider);

   const childrenArray = React.Children.map(children, (child) => {
      return React.cloneElement(child, { TabConsumer });
   });

   const renderChild = childrenArray.filter(child => child.props.tabId === TabConsumer.activeTab);

   return (
      <>
         {!TabConsumer.dataIsFetching && renderChild}
      </>
   );
};

TabContent.propTypes = {
   children: PropTypes.any,
};

Tab.propTypes = {
   children: PropTypes.any,
};

TabSwitch.propTypes = {
   children: PropTypes.any,
   onSwitchTab: PropTypes.func,
   dataIsFetching: PropTypes.bool,
   initialTab: PropTypes.any,
   hasParent: PropTypes.bool,
   location: PropTypes.object,
};

TabSwitch.defaultValue = {
   onSwitchTab: () => {},
   hasParent: false,
   location: null,
};

TabSwitch.Tab = Tab;
TabSwitch.Content = TabContent;

export default TabSwitch;
