import React, { useState } from 'react';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';

const TextWithSeeMore = ({
   text, maxLength, textSize, isBridge, style,
}) => {
   const [isExpanded, setIsExpanded] = useState(false);

   const toggleText = () => {
      setIsExpanded(!isExpanded);
   };

   const truncatedText = text.length > maxLength ? `${ text.slice(0, maxLength) }...` : text;
   const displayText = isExpanded ? text : truncatedText;

   return (
      <div className='textWithSeeMore'>
         <div>

            {!isBridge && (
               <Text
                  type={ textTypes.regularDefault }
                  size={ textSize ? textSizes[textSize] : textSizes.size_14 }
                  inner={ `${ displayText } ${ text.length > maxLength ? `<span style='font-weight: 700; cursor: pointer; padding-left: 5px; white-space: nowrap;'>${ isExpanded ? 'See Less' : 'See More' } </span>` : '' }` }
                  onClick={ toggleText }
               />
            )}
            {isBridge && (
               <div
                  className='lesson__page__content__right__desc'
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={ 
                     { __html: `${ displayText } ${ text.length > maxLength ? `<span style='font-weight: 500; cursor: pointer; padding-left: 5px; white-space: nowrap;'>${ isExpanded ? 'Read Less' : 'Read More' } </span>` : '' }` } }
                  style={ style }
                  onClick={ toggleText }
                  role='presentation'
               />
            )}
         </div>
      </div>
   );
};

TextWithSeeMore.propTypes = {
   text: PropTypes.string,
   maxLength: PropTypes.number,
   textSize: PropTypes.string,
   isBridge: PropTypes.bool,
   style: PropTypes.object,
};


export default TextWithSeeMore;
