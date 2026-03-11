import React from 'react';
import PropTypes from 'prop-types';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const Tag = ({
   innerText,
   iconName,
   handleChangeplaylistCategories,
   category,
}) => {
   return (
      <div className='tag'>
         <Text 
            inner={ innerText }
            size={ sizes.small14 }
            style={ {
               color: '#131F1E',
            } }
         />
         <div
            className='icon__wrapper'
            onClick={ (e) => {
               e.stopPropagation();
               handleChangeplaylistCategories(category);
            } }
            role='presentation'>
            <IconNew name={ iconName } />
         </div>
      </div>
   );
};

Tag.propTypes = {
   innerText: PropTypes.string,
   iconName: PropTypes.string,
   handleChangeplaylistCategories: PropTypes.func,
   category: PropTypes.object,
};

export default Tag;