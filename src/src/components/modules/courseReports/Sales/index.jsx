import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const Sales = () => {
   return (
      <ItemWrapper style={ { border: 'none', maxWidth: '1128px' } }>
         <div className='sales'>
            <Text
               type={ TextType.normal }
               size={ TextSize.medium }
               inner='Sales'
            />
         </div>
      </ItemWrapper>
   );
};

export default Sales;
