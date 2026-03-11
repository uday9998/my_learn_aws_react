import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { getMinimumPrice, currencyPath } from 'utils/getMinimumPrice';
import Axios from 'axios';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import QueryParams from 'utils/QueryParams';

const BridgeRight = ({
   course, isAdmin, style, onClickJoin, isColorLight,
}) => {
   const [progress, setProgress] = useState(true);
   const [currencyData, setCurrencyData] = useState({});

   useEffect(() => {
      if (course.pricings && course.pricings.length > 0 
         && !(course.pricings.filter((pricing => pricing.pricing_type === 0)).length > 0)) {
         Axios.get(
            currencyPath)
            .then(({ data: res }) => {
               setCurrencyData(getMinimumPrice(course.pricings, res));
               setProgress(false);
            });
      } else {
         setProgress(false);
      }
   }, []);

   let lessonsLength = 0;
   if (course.sections && course.type === '0') {
      course.sections.forEach(section => {
         lessonsLength += section.lessons.length;
      });
   }

   const isCommunity = course.type === '2';

   const handleClickJoin = () => {
      if (!(isAdmin || QueryParams.get('isPreview'))) {
         onClickJoin();
      }
   };

   const getTextColor = () => {
    
      const schoolRoomMode = window.schoolRoomSettings?.mode;
    
      const isLightMode = isColorLight || schoolRoomMode === 0;
    
      if (isLightMode || isCommunity) {
        return { color: '#131F1E' };
      }
    

      return { color: 'var(--memberTextColor)' };
    };
    

   const textStyle = getTextColor();

   return (
      progress ? (
         <LoaderSpinner />
      ) : (
         <>
            {course.pricings && course.pricings.length > 0 && (
               <BaseButton
                  theme={ btnTheme.primary }
                  size={ btnSize.full }
                  text={ currencyData.pricingType === 'Subscription' ? `Subscribe  ${ currencyData.price }/${ currencyData.paymentFrequence }` : `Join ${ !currencyData.price ? 'Free' : currencyData.price }` }
                  style={ style }
                  onClick={ handleClickJoin }
                  className='course__bridge__content__right__join__button'
               />
            )}
            <div className={ course.type === '1' && window.location.pathname.includes('bridge') 
               ? 'course__bridge__content__right__footer course__bridge__content__right__footer__membership' : 'course__bridge__content__right__footer' }>
               {course.type === '0' && (
                  <div className='course__bridge__content__right__footer__items'>
                     <Text
                        inner='Lessons:'
                        type={ types.regularDefaultGrey }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                     <TextWithIcon
                        iconName='DocsS'
                        isIconRight={ false }
                        inner={ `${ lessonsLength } ${ lessonsLength > 1 ? 'Lessons' : 'Lesson' }` }
                        type={ types.medium }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                  </div>
               )}
               {course.type === '1' && (
                  <div className='course__bridge__content__right__footer__items'>
                     <Text
                        inner='Type:'
                        type={ types.regularDefaultGrey }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                     <TextWithIcon
                        iconName='PlaylistS'
                        isIconRight={ false }
                        inner='Membership'
                        type={ types.medium }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                  </div>
               )}
               {course.type === '1' && course.users?.length !== undefined && (
                  <div className='course__bridge__content__right__footer__items'>
                     <Text
                        inner='Members:'
                        type={ types.regularDefaultGrey }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                     <TextWithIcon
                        iconName='UserS'
                        isIconRight={ false }
                        inner={ `${ course.users?.length } ${ course.users?.length > 1 ? 'Members' : 'Member' }` }
                        type={ types.medium }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                  </div>
               )}
               {course.pricings && course.pricings.length > 0 && (
                  <div className='course__bridge__content__right__footer__items'>
                     <Text
                        inner='Price:'
                        type={ types.regularDefaultGrey }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                     <TextWithIcon
                        iconName='PriceS'
                        isIconRight={ false }
                        inner={ currencyData.pricingType === 'Subscription' ? `${ currencyData.price }/${ currencyData.paymentFrequence }` : (!currencyData.price ? 'Free' : currencyData.price) }
                        type={ types.medium }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                  </div>
               )}
             
               {course.pricings && course.pricings.length > 0 && currencyData.pricingType && (
                  <div className='course__bridge__content__right__footer__items'>
                     <Text
                        inner='Access:'
                        type={ types.regularDefaultGrey }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                     <TextWithIcon
                        iconName='UnlimitedS'
                        isIconRight={ false }
                        inner={ currencyData.pricingType }
                        type={ types.medium }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                  </div>
               )}
               { course.authors && course.authors[0] && (
                  <div className='course__bridge__content__right__footer__items'>
                     <Text
                        inner='By:'
                        type={ types.regularDefaultGrey }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                     <TextWithIcon
                        iconName='UserProgramS'
                        isIconRight={ false }
                        inner={ course.authors[0].name }
                        type={ types.medium }
                        size={ sizes.size_14 }
                        style={ textStyle }
                     />
                  </div>
               )}
            </div>
         </>
      ));
};

BridgeRight.propTypes = {
   course: PropTypes.object,
   isAdmin: PropTypes.bool,
   style: PropTypes.object,
   onClickJoin: PropTypes.func,
   isColorLight: PropTypes.bool,
};

export default BridgeRight;