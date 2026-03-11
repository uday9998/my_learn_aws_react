import React, { useContext } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { OfferContext } from 'containers/pages/mixed/offers';

import PropTypes from 'prop-types';

import NewLessonBlock from '../NewLessonBlock';


import './index.scss';


const ModalLesson = ({ modalLesson, handleShowModal, selectedOffer }) => {
   const { handleBuyOffer } = useContext(OfferContext);

   return (
      <div className='courses_modal'>
         <div className='inner_modal_wrapper'>
            <Text
               inner='To unlock this lesson, you need to purchase this course'
               size={ sizes.xxlarge }
               type={ types.medium }
               style={ { color: 'var(--textColor)' } }
            />
            <NewLessonBlock modalLesson={ modalLesson } />
            <div className='buttons_wrapper'>
               <BaseButton onClick={ handleShowModal } theme='white' text='Cancel' style={ { padding: '13px 16px' } } size='large120' />
               <BaseButton
                  theme='explore'
                  text='Go To Checkout'
                  onClick={ () => {
                     handleBuyOffer(selectedOffer.plan);
                     handleShowModal(modalLesson);
                  } } />
            </div>
         </div>
      </div>
   );
};


ModalLesson.propTypes = {
   modalLesson: PropTypes.object,
   handleShowModal: PropTypes.func,
   selectedOffer: PropTypes.object,
};


export default ModalLesson;
