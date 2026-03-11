import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import './index.scss';
import ImageWithBlur from 'components/elements/ImageWithBlur';
import cn from 'classnames';

const CardTop = ({
   offerPlan,
   data,
   user,
   imageBackground,
   lessonsCountBackground,
   lessonsCountColor,
   progressSliderBackground,
}) => {
   return (
      <div
         className='product__card__top'
         style={ {
         } }
      >
         {
            offerPlan.pricings.some(pricing => pricing.pricing_type !== 0) && !data.joined && (
               <div
                  className='product__card__top__locked'
                  style={ {
                     backgroundColor: lessonsCountBackground,
                     marginLeft: '10px',
                  } }
               >
                  <IconNew
                     name='SchoolRoomProductLockedM'
                     color={ lessonsCountColor }
                  />
               </div>
            )
         }
         <ImageWithBlur
            src={ imageBackground }
         />
         <div
            className='product__card__top__badges__wrapper'
         />
         {Boolean(user) && (
            <div
               className='product__card__top__bottom'
            >
               {
                  data.type === '2' || !data.joined ? (
                     <div />
                  ) : (
                     <div
                        className='product__card__top__bottom__percent'
                     >
                        {/* {
                           schoolRoomThemeName !== 'template1' && (
                              <span
                                 style={ {
                                    color: progressPercentColor,
                                 } }
                              >
                                 {data.progress_percentage || 0}%
                              </span>
                           )
                        } */}
                        
                        <div
                           className={ cn({
                              'progress__slider__new': true,
                              // 'progress__slider': schoolRoomThemeName !== 'template1',
                           }) }
                           style={ {
                              backgroundColor: progressSliderBackground,
                           } }
                        >
                           <div
                              className='progress__slider__completed'
                              style={ {
                                 width: `${ data.progress_percentage || 0 }%`,
                                 backgroundColor: 'var(--buttonBgcolor)',
                              } }
                           />
                        </div>
                     </div>
                  )
               }
               {/* <Button
                  iconName={ data.liked ? 'SchoolRoomHeartSActive' : 'SchoolRoomHeartS' }
                  // iconColor='var(--textColor)'
                  iconColor={ lessonsCountColor }
                  style={ {
                     background: '#131F1E99',
                     color: lessonsCountColor,
                     padding: '8px',
                     border: 'none',
                     minHeight: 'auto',
                  } }
                  isIconRight={ true }
                  isIconLeft={ false }
                  text=''
                  onClick={ toggleLike }
               /> */}
            </div>
         )}
      </div>
   );
};

CardTop.propTypes = {
   offerPlan: PropTypes.object,
   data: PropTypes.object,
   user: PropTypes.object,
   imageBackground: PropTypes.string,
   lessonsCountBackground: PropTypes.string,
   lessonsCountColor: PropTypes.string,
   progressSliderBackground: PropTypes.string,
};

export default CardTop;
