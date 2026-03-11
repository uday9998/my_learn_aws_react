import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text from 'components/elements/TextNew';
import './index.scss';
import { uniqueId } from 'lodash';
import IToolTip from '../IToolTIp';

const SearchText = ({
   textProps, searchText, activeColor, tooltip,
}) => {
   const [titleArray, setTitleArray] = useState([]);
   useEffect(() => {
      let toArray = null;
      if (window.innerWidth < 1024) {
         toArray = textProps.inner.length > 16 ? (`${ textProps.inner.slice(0, 24) }...`).split(' ') : textProps.inner.split(' ');
      } else {
         toArray = textProps.inner.split(' '); 
      }
      setTitleArray(toArray);
   }, []);

   const isActive = (word) => {
      let isIncludes = false;
      searchText.split(' ').forEach(element => {
         if (element.toLowerCase() === word.toLowerCase()) {
            isIncludes = true;
         }
      });
      return isIncludes;
   };


   return (
      <div className='search__text'>
         {titleArray.map((text) => {
            return (
               <div
                  className='search__text__word'
                  key={ uniqueId() }
                  style={ { background: isActive(text) ? activeColor : 'inherit' } }
               >
                  <Text
                     { ...textProps }
                     inner={ text }
                  />
               </div>
            );
         })}
         {tooltip && tooltip.length > 20 && <IToolTip tooltip={ tooltip } iconName='Help' />}
      </div>
   );
};

SearchText.propTypes = {
   textProps: PropTypes.object,
   searchText: PropTypes.string,
   activeColor: PropTypes.string,
   tooltip: PropTypes.string,
};

export default SearchText;
