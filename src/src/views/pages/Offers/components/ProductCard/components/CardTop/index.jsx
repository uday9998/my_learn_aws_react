import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Button from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import ImageWithBlur from 'components/elements/ImageWithBlur';

const CardTop = ({
   offerPlan,
   data,
   user,
   imageBackground,
   lessonsCountBackground,
   lessonsCountColor,
   progressPercentColor,
   progressSliderBackground,
   toggleLike,
}) => {
   return (
      <div
         className='product__card__top'
         style={ {
         } }
      >
         <ImageWithBlur
            src={ imageBackground }
         />
         <div
            className='product__card__top__badges__wrapper'
         >
            {
               offerPlan.pricings.some(pricing => pricing.pricing_type !== 0) && !data.joined && (
                  <div
                     className='product__card__top__locked'
                     style={ {
                        backgroundColor: lessonsCountBackground,
                     } }
                  >
                     <IconNew
                        name='SchoolRoomProductLockedM'
                        color={ lessonsCountColor }
                     />
                  </div>
               )
            }
            {
               data.type !== '2' && (
                  <div
                     className='product__card__top__count'
                     style={ {
                        backgroundColor: lessonsCountBackground,
                     } }
                  >
                     <IconNew
                        name='LessonMyAccountS'
                        color={ lessonsCountColor }
                     />
                     <span
                        style={ {
                           color: lessonsCountColor,
                        } }
                     >
                        {data.lessons_count}
                     </span>
                  </div>
               )
            }
         </div>
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
                        <span
                           style={ {
                              color: progressPercentColor,
                           } }
                        >
                           {data.progress_percentage || 0}%
                        </span>
                        <div
                           className='progress__slider'
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
   progressPercentColor: PropTypes.string,
   progressSliderBackground: PropTypes.string,
   toggleLike: PropTypes.func,
};

export default CardTop;
