import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';


const EmailModalContent = ({ setSendModalClose, title, content }) => {
   return (
      <div>
         <div className='emailModal'>
            <div className='m-b-exl'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner={ title }
               />
            </div>
            <div className='field__2'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner={ content }
               />
            </div>
            <div className='memberUpdate__btns'>
               <div className='memberUpdate__btn'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Ok'
                     onClick={ () => setSendModalClose() }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

EmailModalContent.propTypes = {
   setSendModalClose: PropTypes.func,
   content: PropTypes.string,
   title: PropTypes.string,
};

export default EmailModalContent;
