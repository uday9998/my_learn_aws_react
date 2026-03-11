import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
// import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const AddSection = ({ newSectionTilte }) => {
   return (
      <>
         <ItemWrapper
            border
         >
            <div className='addSection'>
               <Text
                  type={ textType.regular }
                  size={ textSize.small }
                  inner={ (newSectionTilte !== '' && newSectionTilte) || 'Enter the name of section on the right' }
                  bold={ true }
                  color='#8a94a2'
               />
            </div>
         </ItemWrapper>
         {/* <div className='m-t-m'>
            <BaseButton
               theme={ btnType.blueBordered }
               size={ btnSize.full }
               text='Add Section'
            />
         </div> */}
      </>
   );
};

AddSection.propTypes = {
   newSectionTilte: PropTypes.string,
};


export default AddSection;
