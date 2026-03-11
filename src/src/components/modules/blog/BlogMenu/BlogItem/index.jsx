import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const BlogItem = ({
   text, active, tabId, switchTab, number, isDone,
}) => {
   return (
      <div className={ `blogItem__wrapper ${ active ? 'blogItem__wrapper__active' : '' }` }>
         <div
            className='blogItem'
            role='presentation'
            id={ tabId }
            onClick={ () => {
               switchTab(tabId);
            } }
         >

            {isDone && !active ? <IconNew name='CheckedGreenCircleL' />
               : (
                  <div className='blogItem_number'>
                     <Text
                        inner={ number }
                        type={ txtType.regularLarge }
                        size={ txtSizes.xsmall }
                     />
                  </div>
               )}
            <div>
               <Text
                  inner={ text }
                  type={ txtType.regularLarge }
                  size={ txtSizes.xsmall }
               />
            </div>
         </div>
      </div>
   );
};

export default BlogItem;

BlogItem.propTypes = {
   text: PropTypes.string,
   active: PropTypes.bool,
   tabId: PropTypes.any,
   switchTab: PropTypes.func,
   isDone: PropTypes.bool,
   number: PropTypes.bool,
};
