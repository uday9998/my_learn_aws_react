/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import TruncateText from 'components/elements/TruncateText';
import OfferEditorButton from '../Editor/Button';
import CardTop from './components/CardTop';

import './index.scss';

const ProductCard = ({
   data,
   type,
   item,
   isEditor,
   user,
   offerPlan,
   toggleLike,
   handleClickCourseButton,
   schoolRoomThemeName,
   getPrimaryButtonText,
   mainBackgroundColor,
   template,
}) => {
   const nameColor = item.subcomponent[0].props.color || 'var(--textColor)';
   const descriptionColor = item.subcomponent[1].props.color || 'var(--textColor)';

   const cardStylesByTemplates = {
      template1: {
         border: 'none',
         imageBackground: `linear-gradient(0deg, #171717 2.78%, rgba(40, 50, 72, 0.32) 50%), url(${ data.thumbnail_image })`,
         lessonsCountBackground: '#131F1EB2',
         lessonsCountColor: 'var(--textColor)',
         progressSliderBackground: '#E8F2F1',
         progressPercentColor: 'var(--textColor)',
         primaryButtonTextColor: 'var(--textColor)',
      },
      template2: {
         border: '1px solid var(--textColor10)',
         imageBackground: `url(${ data.thumbnail_image })`,
         lessonsCountBackground: 'var(--textColor70)',
         lessonsCountColor: item.props.bgColor,
         progressSliderBackground: '#FFFFFF99',
         progressPercentColor: 'var(--buttonBgcolor)',
         primaryButtonTextColor: item.props.bgColor,
      },
   };

   return (
      <div
         className={ `product__card ${ schoolRoomThemeName }` }
         style={ {
            backgroundColor: template[5].school_room_components[0].props.bgColor || 'var(--offer-card-background)',
            border: cardStylesByTemplates[schoolRoomThemeName].border,
         } }
      >
         <div
            className='product__card__top__wrapper'
         >
            <CardTop
               offerPlan={ offerPlan }
               data={ data }
               user={ user }
               imageBackground={ data.type === '2' && data?.communities?.file_id ? data?.communities?.file_id : data.thumbnail_image }
               lessonsCountBackground={ cardStylesByTemplates[schoolRoomThemeName].lessonsCountBackground }
               lessonsCountColor={ cardStylesByTemplates[schoolRoomThemeName].lessonsCountColor }
               progressPercentColor={ cardStylesByTemplates[schoolRoomThemeName].progressPercentColor }
               progressSliderBackground={ cardStylesByTemplates[schoolRoomThemeName].progressSliderBackground }
               toggleLike={ toggleLike }
            />
         </div>
         <div
            className='product__card__content'
         >
            <div
               className='product__card__content__top'
            >
               <div
                  className='product__card__content__label'
                  style={ {
                     backgroundColor: mainBackgroundColor,
                  } }
               >
                  <span
                     style={ { color: 'var(--textColor70)' } }
                  >
                     {type}
                  </span>
               </div>
               <TruncateText
                  textClass='product__card__content__name'
                  text={ data.name }
                  fontWeight='500'
                  textSize='18px'
                  textStyle={ {
                     color: nameColor,
                  } }
                  width='100%'
               />
               {
                  data.description && (
                     <span
                        className='product__card__content__description'
                        style={ {
                           color: descriptionColor,
                        } }
                     >
                        {data.description}
                     </span>
                  )
               }
            </div>
            <div
               className='product__card__content__bottom'
            >
               <div
                  className='product__card__content__divider'
                  style={ {
                     borderTop: '1px solid var(--textColor20)',
                  } }
               />
               <OfferEditorButton
                  bgColor='var(--buttonBgcolor)'
                  borderColor='var(--buttonBgcolor)'
                  textColor={ cardStylesByTemplates[schoolRoomThemeName].primaryButtonTextColor }
                  fontSize={ 14 }
                  onClick={ isEditor ? () => {} : () => handleClickCourseButton() }
               >
                  {
                     getPrimaryButtonText(data, offerPlan)
                  }
               </OfferEditorButton>
            </div>
         </div>
      </div>
   );
};

ProductCard.propTypes = {
   data: PropTypes.object,
   type: PropTypes.string,
   item: PropTypes.object,
   isEditor: PropTypes.bool,
   user: PropTypes.object,
   offerPlan: PropTypes.object,
   toggleLike: PropTypes.func,
   handleClickCourseButton: PropTypes.func,
   schoolRoomThemeName: PropTypes.string,
   getPrimaryButtonText: PropTypes.func,
   mainBackgroundColor: PropTypes.string,
   template: PropTypes.array,
};

export default ProductCard;
