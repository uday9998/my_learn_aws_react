import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Line from 'components/elements/Line';
import { OfferContext } from 'containers/pages/mixed/offers';
import IconNew from 'components/elements/iconsSize';
import LessonBlock from '../../components/ExploreOffer/LessonBlock';

const LessonPageSection = ({
   section,
   textColor,
   course,
   user,
   handleShowModal,
   number,
   isColorLight,
}) => {
   const [isOpenModal, setIsOpenModal] = React.useState(true);
   const { template, selectedOffer, uuid } = React.useContext(OfferContext);
   const content = template[5];
   const contentItem = content.school_room_components[0];
   const getCheckoutUrl = (plan) => {
      let url = `${ process.env.REACT_APP_CHECKOUT_URL }${ uuid }/0/${ plan.id }`;
      if (user && user.id) {
         url = `${ process.env.REACT_APP_CHECKOUT_URL }${ uuid }/${ user.id }/${ plan.id }`;
      }
      if (plan.test_mode) {
         url = `${ process.env.REACT_APP_CHECKOUT_URL }test_mode/${ plan.test_mode.token }/${ uuid }/0/${ plan.id }`;
      }
      window.open(url, '_blank');
   };
   if (section.status === '0') {
      return null;
   }

   return (
      <div
         className='lesson__page__section'
         style={ {
            backgroundColor: 'var(--mainBg005)',
         } }
      >
         <div className='lesson__page__section__top'>
            <div className='lesson__page__section__top__left'>
               <Text
                  inner={ `${ number }. ${ section.name }` }
                  type={ types.mediumSmall }
                  size={ sizes.size_28 }
                  style={ {
                     color: isColorLight ? '#131F1E' : '#fff',
                  } }
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
                  color={ isColorLight ? '#131F1E' : '#fff' }
               />
            </div>
         </div>
         {section.lessons.length > 0 && (
            <div>
               <Text
                  inner={ `${ section.lessons.length } ${ section.lessons.length > 1 ? 'lessons' : 'lesson' }` }
                  type={ types.regularDefault }
                  size={ sizes.small_14 }
                  style={ { color: isColorLight ? '#131F1E' : '#fff' } }
               />
            </div>
         )}
         {isOpenModal && (
            <>
               {/* <Line
                  background='var(--textColor20)'
               /> */}
               <div className='lesson__page__section__data'>
                  {section.lessons.map((e) => {
                     return (
                        <LessonBlock
                           lesson={ e }
                           course={ course }
                           textColor={ textColor }
                           goToCheckout={ () => getCheckoutUrl(selectedOffer.plan) }
                           item={ contentItem }
                           mainBackgroundColor={ template[0].school_room_section.props.bgColor }
                           handleShowModal={ handleShowModal }
                           isColorLight={ isColorLight }
                        />
                     );
                  })}
               </div>
            </>
         )}
      </div>
   );
};

LessonPageSection.propTypes = {
   section: PropTypes.object,
   course: PropTypes.object,
   textColor: PropTypes.string,
   user: PropTypes.object,
   handleShowModal: PropTypes.func,
   number: PropTypes.number,
   isColorLight: PropTypes.bool,
};

export default LessonPageSection;
