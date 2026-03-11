/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import TruncateText from 'components/elements/TruncateText';
import cardImg from 'assets/images/schoolRoom/card__image.png';
import CardTop from './components/CardTop';

import './index.scss';

const NewProductCard = ({
   data,
   item,
   user,
   offerPlan,
   toggleLike,
   schoolRoomThemeName,
   handleClickCourseButton,
   isEditor,
}) => {
   const nameColor = item.subcomponent[0].props.color || 'var(--textColor)';
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


   const checkImagePath = () => {
      if (data.community_image) {
         return data.community_image;
      } if (data.thumbnail_image && !data.thumbnail_image.includes('thumbnail')) {
         return data.thumbnail_image;
      }
      return cardImg;
   };

   const handleClick = () => {
      if (!isEditor) {
         handleClickCourseButton();
      }
   };

   return (
      <div
         className={ `product__card ${ schoolRoomThemeName }` }
         onClick={ handleClick }
         role='presentation'
      >
         <div
            className='product__card__top__wrapper'
         >
            {
               schoolRoomThemeName === 'template3' ? (
                  <CardTop
                     offerPlan={ offerPlan }
                     data={ data }
                     user={ user }
                     imageBackground={ checkImagePath() }
                     lessonsCountBackground='var(--textColor70)'
                     lessonsCountColor={ item.props.bgColor }
                     progressPercentColor='var(--buttonBgcolor)'
                     progressSliderBackground='#FFFFFF99'
                     toggleLike={ toggleLike }
                  />
               ) : (
                  <CardTop
                     offerPlan={ offerPlan }
                     data={ data }
                     user={ user }
                     imageBackground={ checkImagePath() }
                     lessonsCountBackground={ cardStylesByTemplates[schoolRoomThemeName].lessonsCountBackground }
                     lessonsCountColor={ cardStylesByTemplates[schoolRoomThemeName].lessonsCountColor }
                     progressPercentColor={ cardStylesByTemplates[schoolRoomThemeName].progressPercentColor }
                     progressSliderBackground={ cardStylesByTemplates[schoolRoomThemeName].progressSliderBackground }
                     toggleLike={ toggleLike }
                     schoolRoomThemeName={ schoolRoomThemeName }
                  />
               )
            }


         </div>
         <div
            className='product__card__content'
         >
            <div
               className='product__card__content__top'
            >
               <TruncateText
                  textClass='product__card__content__names'
                  text={ data.name }
                  fontWeight='500'
                  textSize='18px'
                  textStyle={ {
                     color: nameColor,
                  } }
                  width='100%'
               />
            </div>
         </div>
      </div>
   );
};

NewProductCard.propTypes = {
   data: PropTypes.object,
   item: PropTypes.object,
   user: PropTypes.object,
   offerPlan: PropTypes.object,
   toggleLike: PropTypes.func,
   schoolRoomThemeName: PropTypes.string,
   handleClickCourseButton: PropTypes.func,
   isEditor: PropTypes.bool,
};

export default NewProductCard;
