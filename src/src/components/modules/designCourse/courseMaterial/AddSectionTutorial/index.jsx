import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import gif from 'assets/images/sections.gif';

const AddSectionTutorial = () => {
   return (
      <ItemWrapper>
         <div className='addSectionTutorial'>
            <Text
               type={ textType.bold }
               size={ textSize.medium }
               inner='It’s Time To Build Your Class'
            />
            <Text
               type={ textType.regular }
               size={ textSize.extraSmall }
               inner={ ['Now add a section to the left to continue creating your class. Want to learn more? ', <a href='https://support.miestro.com/' style={ { color: '#006dff', textDecoration: 'none', fontWeight: '600' } } rel='noopener noreferrer' target='_blank'>Check our tutorials </a>] }
               style={ { 'margin': '8px 0 26px' } }
            />
            <img className='tutorial-gif' src={ gif } alt='gif' />
         </div>
      </ItemWrapper>
   );
};

export default AddSectionTutorial;
