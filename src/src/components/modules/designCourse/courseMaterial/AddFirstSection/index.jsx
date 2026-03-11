import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import { ReactComponent as AddSectionIcon } from 'assets/images/add-section.svg';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const AddFirstSection = ({ handleAddingSection }) => {
   return (
      <>
         <ItemWrapper>
            <div
               role='presentation'
               onClick={ () => handleAddingSection(true) }
               className='addFirstSection'
            >
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner='Add Your First Section'
               />
               <div className='text-center m-t-exs m-b-exl'>
                  <Text
                     type={ textType.regular }
                     size={ textSize.small }
                     bold={ true }
                     inner='Create new section by adding video, audio, text, pdf and ppt lessons for your students'
                     color='#8a94a2'
                  />
               </div>
               <AddSectionIcon />
            </div>
         </ItemWrapper>
         <div className='m-t-exl'>
            <BaseButton
               theme={ btnType.blueBordered }
               size={ btnSize.full }
               text='Add Section'
               onClick={ () => handleAddingSection(true) }
            />
         </div>
      </>
   );
};

AddFirstSection.propTypes = {
   handleAddingSection: PropTypes.func,
};


export default AddFirstSection;
