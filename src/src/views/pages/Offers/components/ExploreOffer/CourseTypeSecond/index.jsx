/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import classNames from 'classnames';
import { OfferContext } from 'containers/pages/mixed/offers';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import { getLandingUrl } from 'utils/url';
import OfferEditorButton from '../../Editor/Button';

const CourseTypeRow = ({
   course, item, slug, goToCheckout, exploreCourse,
}) => {
   const titleColor = item.subcomponent[0].props.color;
   const background = item.props.bgColor;
   const offerDescription = item.subcomponent[1].props;
   const offerPrimaryButton = item.subcomponent[2].props;
   const offerSecondaryButton = item.subcomponent[3].props;
   const [active, setActive] = React.useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const joined = course && course.joined && course.joined_status !== 3;
   const openItem = () => {
      if (joined) {
         window.open(`/courses/${ course.url }`, '_blank');
      }
   };
   const {
      isEditor, onClickElement, isPreview, selectedOffer,
   } = React.useContext(OfferContext);

   const handleBuy = () => {
      if (selectedOffer.plan.active_landing_url) {
         const url = getLandingUrl(selectedOffer.plan.active_landing_url);
         window.open(url, '_blank');
         return;
      }
      goToCheckout();
   };
   return (
      <div
         role='presentation'
         style={ { background, cursor: 'pointer' } }
         onClick={ (e) => {
            onClickElement(e);
            openItem();
         } }
         className={
            classNames({
               'offer__type__second': !active || !isEditor,
               'offer__type__second mark': active && isEditor,
            })

         }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div className='offer__type__second__left'>
            <img src={ course.thumbnail_image ? course.thumbnail_image : '' } alt='' />
         </div>
         <div className='offer__type__second__right'>
            <div className='data'>
               <div className='data__top'>
                  <Text
                     inner={ course.name }
                     type={ types.medium153 }
                     style={ { color: titleColor } }
                     size={ sizes.large }
                  />
                  {offerDescription.visibility && (
                     <Text
                        inner={ course.description || '' }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: offerDescription.color } }
                     />
                  )}
               </div>
               {/* <div className='data__user'>
                 <Text
                    inner={ site.title }
                    type={ types.regularDefault }
                    size={ sizes.small }
                 />
              </div> */}
               <div />
            </div>
            <div className='purchase'>
               <div className='purchase__top'>
                  {!joined && (
                     <OfferEditorButton
                        bgColor='var(--buttonBgcolor)'
                        borderColor='var(--buttonBgcolor)'
                        textColor='var(--textColor)'
                        fontSize={ offerPrimaryButton.fontSize }
                        onClick={ isEditor ? () => {} : () => handleBuy() }
                     >
                        Buy Product
                     </OfferEditorButton>
                  )}
                  <OfferEditorButton
                     bgColor='var(--secondaryButtonBgcolor)'
                     borderColor='var(--secondaryTextColor)'
                     textColor='var(--secondaryTextColor)'
                     fontSize={ offerSecondaryButton.fontSize }
                     onClick={ isEditor || isPreview ? () => {} : () => exploreCourse(course.id) }
                  >
                     <IconNew name='SchoolRoomExploreM' color='var(--secondaryTextColor)' />
                     Explore
                  </OfferEditorButton>
               </div>
            </div>
         </div>
      </div>
   );
};

CourseTypeRow.propTypes = {
   item: PropTypes.object,
   slug: PropTypes.string,
   course: PropTypes.object,
   goToCheckout: PropTypes.func,
   exploreCourse: PropTypes.func,
};

export default CourseTypeRow;
