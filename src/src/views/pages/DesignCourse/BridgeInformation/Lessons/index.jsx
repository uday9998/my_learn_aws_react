import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import LessonBlock from './LessonBlock';

const Lessons = ({
   section,
   number,
   course,
}) => {
   const [isOpenModal, setIsOpenModal] = useState(true);
   return (
      <div
         className='lesson__page__section'
      >
         <div className='lesson__page__section__top'>
            <div className='lesson__page__section__top__left'>
               <Text
                  inner={ `${ number }. ${ section.name }` }
                  type={ types.mediumSmall }
                  size={ sizes.size_28 }
               />
            </div>
            <div
               role='presentation'
               onClick={ () => setIsOpenModal(!isOpenModal) }
               style={ { transform: `rotate(${ isOpenModal ? '0' : '180' }deg)` } }
               className='lesson__page__section__top__right'
            >
               <IconNew
                  name='ArrowDownL'
                  color='#000'
               />
            </div>
         </div>
         {section.lessons.length > 0 && (
            <div>
               <Text
                  inner={ `${ section.lessons.length } ${ section.lessons.length > 1 ? 'lessons' : 'lesson' }` }
                  type={ types.regularDefault }
                  size={ sizes.small_14 }
               />
            </div>
         )}
         {isOpenModal && (
            <div className='lesson__page__section__data'>
               {section.lessons.map((e) => {
                  return (
                     <LessonBlock
                        lesson={ e }
                        course={ course }
                        // textColor={ textColor }
                        // goToCheckout={ () => getCheckoutUrl(selectedOffer.plan) }
                        // item={ contentItem }
                        // mainBackgroundColor={ template[0].school_room_section.props.bgColor }
                        //  handleShowModal={ handleShowModal }
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};

Lessons.propTypes = {
   section: PropTypes.object,
   number: PropTypes.number,
   course: PropTypes.object,
};

export default Lessons;
