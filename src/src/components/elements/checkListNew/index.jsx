import React from 'react';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import { uniqueId } from 'lodash';

const CheckList = ({
   items, values, onChange, hasSubtitle,
}) => {
   return (
      <div className='checklist'>
         {items.map(item => {
            return (
               <>
                  <div
                     key={ uniqueId() }
                     role='presentation'
                     onClick={ () => onChange(item.value) }
                     className='checklist__item'
                  >
                     {values && values.includes(item.value) ? (
                        <div className='checklist__checked' />
                     ) : (
                        <div className='checklist__unchecked' />
                     )}
                     {item.content ? item.content : (
                        <Text
                           inner={ item.key }
                           type={ txtTypes.regular148 }
                           size={ txtSizes.medium }
                        />
                     )}
                  </div>
                  {hasSubtitle && (
                     <div className='checklist__subtitle'>
                        <Text
                           inner={ item.subtitle }
                           type={ txtTypes.regularDefaultGrey }
                           size={ txtSizes.small }
                        />
                     </div>
                  )}
               </>
            );
         })}
      </div>
   );
};

CheckList.propTypes = {
   items: PropTypes.array,
   values: PropTypes.any,
   onChange: PropTypes.func,
   hasSubtitle: PropTypes.bool,
};

export default CheckList;
