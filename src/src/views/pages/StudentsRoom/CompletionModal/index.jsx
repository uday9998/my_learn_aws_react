import React from 'react';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import illustration from 'assets/images/studentsRoom/illustration.png';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';

const CompletionModal = ({
   closeModal,
}) => {
   return (
      <div className='CompletionLeeson-Modal'>
         {/* <div className='img-content'>
            <img src={ illustration } alt='' />
         </div> */}
         <div className='modal-header'>
            <div
               role='presentation'
               className='close'
               onClick={ closeModal }
            >
               <Icon name='CloseX' />
            </div>
         </div>
         <div className='modal-body' style={ { backgroundImg: `url(${ illustration })` } }>
            <div>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.size_32 }
                  inner='Congratulations'
                  className='complated-title'
                  style={ { color: 'var(--textColor)' } }
               />
               <div>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.large }
                     inner='You have successfully completed the course.'
                     className='complated-description'
                     style={ { color: 'var(--textColor)' } }
                  />
               </div>
            </div>
            <div className='w-full butttonContent'>
               <BaseButton
                  size={ btnSize.large }
                  text='Finish'
                  onClick={ closeModal }
                  style={ {
                     background: 'var(--buttonBgcolor)',
                     border: '1px solid var(--textColor)',
                     color: 'var(--textColor)',
                  } }

               />
            </div>
         </div>
      </div>
   );
};

CompletionModal.propTypes = {
   closeModal: PropTypes.func,
};

CompletionModal.defaultProps = {
   closeModal: () => {},
};

export default CompletionModal;
