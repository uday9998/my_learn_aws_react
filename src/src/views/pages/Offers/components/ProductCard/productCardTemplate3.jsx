import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TruncateText from 'components/elements/TruncateText';
import OfferEditorButton from '../Editor/Button';
import CardTop from './components/CardTop';

const ProductCardTemplate3 = ({
   data,
   type,
   item,
   isEditor,
   user,
   offerPlan,
   toggleLike,
   handleClickCourseButton,
   getPrimaryButtonText,
   mainBackgroundColor,
}) => {
   const nameColor = item.subcomponent[0].props.color || 'var(--textColor)';
   const descriptionColor = item.subcomponent[1].props.color || 'var(--textColor)';


   // const cardStylesByTemplates = {
   //    template1: {
   //       border: 'none',
   //       imageBackground: `linear-gradient(0deg, #171717 2.78%, rgba(40, 50, 72, 0.32) 50%), url(${data.thumbnail_image})`,
   //       lessonsCountBackground: '#131F1EB2',
   //       lessonsCountColor: 'var(--textColor)',
   //       progressSliderBackground: '#E8F2F1',
   //       progressPercentColor: 'var(--textColor)',
   //       primaryButtonTextColor: 'var(--textColor)',
   //    },
   //    template2: {
   //       border: '1px solid var(--textColor10)',
   //       imageBackground: `url(${data.thumbnail_image})`,
   //       lessonsCountBackground: 'var(--textColor70)',
   //       lessonsCountColor: item.props.bgColor,
   //       progressSliderBackground: '#FFFFFF99',
   //       progressPercentColor: 'var(--buttonBgcolor)',
   //       primaryButtonTextColor: item.props.bgColor,
   //    },
   //    template3: {
   //       border: '1px solid var(--textColor10)',
   //       imageBackground: `url(${data.thumbnail_image})`,
   //       lessonsCountBackground: 'var(--textColor70)',
   //       lessonsCountColor: item.props.bgColor,
   //       progressSliderBackground: '#FFFFFF99',
   //       progressPercentColor: 'var(--buttonBgcolor)',
   //       primaryButtonTextColor: item.props.bgColor,
   //    },
   // };

   return (
      <div
         className='product__card__template3'
         style={ {
            backgroundColor: item.props.bgColor,
            border: '1px solid var(--textColor10)',
         } }
      >
         <div
            className='product__card__template3__left'
         >
            <CardTop
               offerPlan={ offerPlan }
               data={ data }
               user={ user }
               imageBackground={ data.thumbnail_image }
               lessonsCountBackground='var(--textColor70)'
               lessonsCountColor={ item.props.bgColor }
               progressPercentColor='var(--buttonBgcolor)'
               progressSliderBackground='#FFFFFF99'
               toggleLike={ toggleLike }
            />
         </div>
         <div
            className='product__card__template3__right'
         >
            <div
               className='product__card__template3__right__top'
            >
               <div
                  className='product__card__template3__right__label'
               >
                  <div
                     className='product__card__content__label'
                     style={ {
                        backgroundColor: mainBackgroundColor,
                     } }
                  >
                     <span>{type}</span>
                  </div>
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
                     <TruncateText
                        text={ data.description }
                        textClass='product__card__template3__right__top__description'
                        style={ {
                           color: descriptionColor,
                           fontSize: '14px',
                        } }
                        textSize='14px'
                     />
                  )
               }
            </div>
            <div
               className='product__card__template3__right__bottom'
            >
               <div
                  className='product__card__content__divider'
                  style={ {
                     borderTop: '1px solid var(--textColor20)',
                  } }
               />
               <div
                  className='product__card__template3__right__bottom__buttons'
               >
                  <OfferEditorButton
                     bgColor='var(--buttonBgcolor)'
                     borderColor='var(--buttonBgcolor)'
                     textColor={ item.props.bgColor }
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
      </div>
   );
};

ProductCardTemplate3.propTypes = {
   data: PropTypes.object,
   type: PropTypes.string,
   item: PropTypes.object,
   isEditor: PropTypes.bool,
   user: PropTypes.object,
   offerPlan: PropTypes.object,
   toggleLike: PropTypes.func,
   handleClickCourseButton: PropTypes.func,
   getPrimaryButtonText: PropTypes.func,
   mainBackgroundColor: PropTypes.string,
};

export default ProductCardTemplate3;
