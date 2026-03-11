import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import SliceAndConnectText from 'utils/getSplitedText';

const NotFound = ({ searchText }) => {
   return (
      <div className='offer__not__found'>
         <IconNew name='NotFoundResultEmojiM' />
         <div className='offer__not__found__text'>
            <Text
               inner={ searchText || 'No results found for your search.' }
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
            {/* <div className='offer__not__found__text__col'>
               <Text
                  inner='this query'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
               <Text
                  inner={ ` "${ SliceAndConnectText(searchText, 100) }".` }
                  type={ types.mediumLarge }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div> */}
         </div>
      </div>
   );
};

NotFound.propTypes = {
   searchText: PropTypes.string,
};

export default NotFound;
