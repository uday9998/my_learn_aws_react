import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import { IMAGES_BASE_URL } from 'utils/constants';
import './index.scss';
import moment from 'moment';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';

function getTemplateImage(landingPageId) {
   const templateImages = {
      17: 'template1',
      14: 'template2',
      15: 'template3',
      16: 'template4',
      18: 'template5',
      19: 'template6',
   };
   const template = templateImages[landingPageId] || templateImages[14];
   return `${ IMAGES_BASE_URL }landings/${ template }_small.webp`;
}

const LandingItem = ({
   editLanding, duplicateLanding, deleteLanding, landing, updateLandingDetails,
   detailsLanding,
}) => {
   const [popupIsOpen, setPopupIsOpen] = useState(false);
   const [copyView, setCopyView] = useState(null);
   function openPopup(e) {
      e.stopPropagation();
      setPopupIsOpen(!popupIsOpen);
   }
   const {
      name,
      url,
      landing_page_id: landingPageId,
      is_published: isPublished,
      created_at: createdAt,
   } = landing;
   const img = getTemplateImage(landingPageId);

   const duplicateLandingClick = (e) => {
      e.stopPropagation();
      duplicateLanding();
      setPopupIsOpen(false);
   };

   const handleCopy = () => {
      const copyText = `${ window.location.origin }/p/${ landing.url }`;
      const el = document.createElement('input');
      el.value = copyText;
      document.body.appendChild(el);

      el.select();
      el.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(el);
      setTimeout(
         () => setCopyView(landing.url),
         0
      );
      setTimeout(
         () => setCopyView(null),
         800
      );
   };

   const showLandingPreview = () => {
      window.open(`${ window.location.origin }/p/${ landing.url }`, '_blank');
   };

   return (
      <div className={ `landingsList__item  ${ landing.url }` }>
         <div className='landingList__item__image'>
            <img src={ img } alt='Landing Template' />
         </div>
         <div className='landingList__item__content'>
            <div className='landingsList__item__title'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner={ name }
               />
            </div>
            <div className='landingList__item__info'>
               <div className='landingList__item__info__date'>
                  <Text
                     type={ TextType.medium }
                     size={ TextSize.extraSmall }
                     inner={ isPublished ? 'Published' : 'Draft' }
                     className='landing__create'
                     color='#fff'
                     style={ { backgroundColor: isPublished ? '#7cb740' : '#c2cedb', padding: '4px 8px', borderRadius: '4px' } }
                  />
               </div>
               <div className='landingList__item__info__date'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner={ moment(createdAt).format('DD MMM YYYY') }
                     className='landing__create'
                     color='#94959c'
                  />
               </div>
               <div className='landingsList__item__actions'>
                  <div className='landingsList__item__actions__preview' title='preview' role='presentation' onClick={ () => showLandingPreview(url) }>
                     <Icon name='LandingPreview' />
                  </div>
                  <div className='landingsList__item__actions__edit' title='edit' role='presentation' onClick={ () => editLanding() }>
                     <Icon name='LandingEdit' />
                  </div>
                  <div className='landingsList__item__actions__delete' title='delete' role='presentation' onClick={ () => deleteLanding() }>
                     <Icon name='LandingDelete' />
                  </div>
                  <div
                     className='landingsList__item__actions__more'
                     title='more'
                     role='presentation'
                     onClick={ async (e) => {
                        await openPopup(e);
                        if (document.getElementsByClassName(` ${ landing.url }`)[0]) {
                           if (document.getElementsByClassName(` ${ landing.url }`)[0].getBoundingClientRect().y > document.getElementsByClassName('adminContent')[0].clientHeight) {
                              document.getElementsByClassName('adminContent')[0].scrollTop = document.getElementsByClassName('adminContent')[0].scrollTop + (document.getElementsByClassName(` ${ landing.url }`)[0].getBoundingClientRect().y - document.getElementsByClassName('adminContent')[0].clientHeight + 100);
                           }
                        }
                     } }
                  >
                     <Icon name='LandingMore' />
                     {
                        popupIsOpen && (
                           <div className='showLandingActions__popup'>
                              <ClickOutside onClick={ (e) => openPopup(e) }>
                                 <div role='presentation' onClick={ (e) => duplicateLandingClick(e) } title='Clone'>
                                    <Text
                                       type={ TextType.demiBold }
                                       size={ TextSize.extraSmall }
                                       inner='Clone'
                                       color='#212121'
                                    />
                                 </div>
                                 <div className='m-t-exs' title={ !isPublished ? 'Publish' : 'Draft' } role='presentation' onClick={ () => { updateLandingDetails(); } }>
                                    <Text
                                       type={ TextType.demiBold }
                                       size={ TextSize.extraSmall }
                                       inner={ !isPublished ? 'Publish' : 'Draft' }
                                       color='#212121'
                                    />
                                 </div>
                                 <div className='m-t-exs' title='Settings' role='presentation' onClick={ () => detailsLanding(url) }>
                                    <Text
                                       type={ TextType.demiBold }
                                       size={ TextSize.extraSmall }
                                       inner='Settings'
                                       color='#212121'
                                    />
                                 </div>
                                 <div>
                                    <div className='m-t-exs' title='Copy Link' role='presentation' onClick={ () => handleCopy() }>
                                       <Text
                                          type={ TextType.demiBold }
                                          size={ TextSize.extraSmall }
                                          inner='Copy Link'
                                          color='#212121'
                                       />
                                    </div>

                                 </div>
                              </ClickOutside>
                           </div>
                        )
                     }
                     { copyView === landing.url
                        && <div className='copybtn__copiedText'>Copied</div>
                     }
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

LandingItem.propTypes = {
   editLanding: PropTypes.func,
   duplicateLanding: PropTypes.func,
   deleteLanding: PropTypes.func,
   landing: PropTypes.object,
   detailsLanding: PropTypes.func,
   updateLandingDetails: PropTypes.func,
};

export default LandingItem;
