/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { OfferContext } from 'containers/pages/mixed/offers';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import classNames from 'classnames';
import { getLandingUrl } from 'utils/url';
import OfferEditorButton from '../../Editor/Button';

const CourseTypeSlider = ({
   course, slug, item, goToCheckout, exploreCourse,
}) => {
   const {
      isEditor, onClickElement, isPreview, selectedOffer,
   } = React.useContext(OfferContext);
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
   const titleColor = item.subcomponent[0].props.color;
   const background = item.props.bgColor;
   const offerDescription = item.subcomponent[1].props;
   const offerPrimaryButton = item.subcomponent[2].props;
   const offerSecondaryButton = item.subcomponent[3].props;
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
         className={
            classNames({
               'offer__card': !active || !isEditor,
               'offer__card mark': active && isEditor,
            })
         }
         style={ { background, cursor: 'pointer' } }
         onClick={ (e) => {
            onClickElement(e);
            openItem();
         } }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div className='offer__card__top'>
            <img src={ course.thumbnail_image ? course.thumbnail_image : '' } alt='' />
         </div>
         <div className='offer__card__info'>
            <Text
               inner={ course.name }
               style={ { color: titleColor } }
               type={ types.medium153 }
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
         <div className='offer__card__buttons'>
            {!joined && (
               <OfferEditorButton
                  bgColor='var(--buttonBgcolor)'
                  borderColor='var(--buttonBgcolor)'
                  fontSize={ offerPrimaryButton.fontSize }
                  textColor='var(--textColor)'
                  onClick={ isEditor || isPreview ? () => {} : () => handleBuy() }
               >
                  Buy Product
               </OfferEditorButton>
            )}
            <OfferEditorButton
               bgColor='var(--secondaryButtonBgcolor)'
               borderColor='var(--secondaryTextColor)'
               fontSize={ offerSecondaryButton.fontSize }
               textColor='var(--secondaryTextColor)'
               onClick={ isEditor ? () => {} : () => exploreCourse(course.id) }
            >
               <IconNew name='SchoolRoomExploreM' color='var(--secondaryTextColor)' />
               Explore
            </OfferEditorButton>
            {/* If Plan is not free */}
            {/* <OfferEditorButton
               bgColor='#7B53E9'
               borderColor='#7B53E9'
               textColor='#fff'
               onClick={ () => alert('incoming') }
            >
                Buy Product
            </OfferEditorButton>
            <OfferEditorButton
               bgColor='#fff'
               borderColor='#7B53E9'
               textColor='#7B53E9'
               onClick={ () => alert('incoming') }
            >
               <IconNew name='SchoolRoomExploreM' />
                Explore
            </OfferEditorButton> */}
            {/* If Plan Free */}

         </div>
      </div>
   );
};

CourseTypeSlider.propTypes = {
   course: PropTypes.object,
   slug: PropTypes.string,
   item: PropTypes.object,
   exploreCourse: PropTypes.func,
   goToCheckout: PropTypes.func,
};

export default CourseTypeSlider;
