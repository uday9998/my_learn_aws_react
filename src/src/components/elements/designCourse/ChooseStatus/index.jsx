import React, { useRef, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Status from 'components/elements/statusNew';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import momentTimezone from 'moment-timezone';
import IconNew from 'components/elements/iconsSize';
import IToolTIpText from 'components/elements/IToolTIpText';
import { useSelector } from 'react-redux';
import { mainAppSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const ChooseStatus = ({
   isPublished, onClick, openModal, publishDate, publishTime, onlyIcon, isMob, isCommunity,
}) => {
   const mainApp = useSelector(mainAppSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const [openCourseType, setOpenCourseType] = useState(false);

   const popupRef = useRef(null);

   useOutsideClickDetector(popupRef, () => setOpenCourseType(false));


   const publishStatusType = () => {
      let statusText = '';
      let type = '';
      let icon = '';
      switch (isPublished) {
         case 0:
         case '0':
            statusText = 'Unpublished'; type = 'draft'; icon = 'draftS';
            break;
         case '2':
         case 2: statusText = 'Unpublished'; type = 'draft'; icon = 'draftS';
            break;
         case '1':
         case 1: statusText = 'Published'; type = 'publish'; icon = 'PublishedProgramS16';
            break;
         case '3':
         case 3: statusText = 'Scheduled'; type = 'scheduled'; icon = 'DateTypeCommunityS';
            break;
         default:
      }
      return { statusText, type, icon };
   };

   let publishStatusTypes = [
      {
         text: 'Published', type: 'publish', icon: 'PublishedProgramS16', iconParams: {},
      },
      {
         text: 'Unpublished', type: 'draft', icon: 'draftS', iconParams: {},
      },
   ];

   if (!isCommunity) {
      publishStatusTypes = [
         ...publishStatusTypes,
         {
            text: 'Scheduled', type: 'scheduled', icon: 'DateTypeCommunityS', iconParams: { color: '#A61C23' },
         },
      ];
   }

   const userTimeZone = momentTimezone.tz.guess();
   // const dateUserTimeZone = momentTimezone.tz(`${ publishDate } ${ publishTime }`, userTimeZone);
   // const dateUTC = dateUserTimeZone.utc().format('MMMM Do YYYY, HH:mm:ss z'); // 2013-11-18T03:55Z
   // ;
   const dateUserTimeZone = momentTimezone.utc(`${ publishDate } ${ publishTime }`).tz(userTimeZone);
   const dateUserTimeZoneFormat = dateUserTimeZone.format('MMMM DD, YYYY hh:mm A');

   const handleChangeScheduled = (e, publishStatus) => {
      e.stopPropagation();
      if (publishStatus.type === 'scheduled' && !mainApp?.plan_name.includes('starter')) {
         openModal(); 
         setOpenCourseType(false);
      } else if (publishStatus.type !== 'scheduled') {
         onClick(publishStatus.type === 'publish' ? 0 : 1); 
         setOpenCourseType(false);
      } else {
         setShowPopup(true);
         setPopupTitle('Drip');
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <>
         {isMob && openCourseType && <div className='statusTypes__back' />}
         <div className='statusTypes'>
            {
               showPopup && createPortal(<PricingPopup
                  handleClosePopup={ handleClosePopup }
                  popupTitle={ popupTitle }
               />, document.body)
            }
            <div onClick={ (e) => { e.stopPropagation(); setOpenCourseType(true); } } role='presentation' className={ `statusTypes__${ publishStatusType().type }` }>
               {!(publishStatusType().type === 'drip' || publishStatusType().type === 'scheduled') && (
                  <Status
                     text={ onlyIcon ? '' : publishStatusType().statusText }
                     type={ publishStatusType().type }
                     icon={ publishStatusType().icon }
                  />
               )}
               { (publishStatusType().type === 'drip' || publishStatusType().type === 'scheduled') && (
                  <IToolTIpText title='' tooltip={ dateUserTimeZoneFormat } isStatus={ true }>
                     <Status
                        text={ onlyIcon ? '' : publishStatusType().statusText }
                        type={ publishStatusType().type }
                        icon={ publishStatusType().icon }
                     />
                  </IToolTIpText>
               )}
            </div>
            {openCourseType && (
               <div className='statusType' ref={ popupRef } onClick={ (e) => { e.stopPropagation(); } } role='presentation'>
                  {isMob && openCourseType
                   && (
                      <div className='statusType__title'>
                         <div> <Text
                            size={ textSize.small }
                            type={ textType.medium }
                            inner='Change Status'
                         />
                         </div>
                         <div
                            role='presentation'
                            onClick={ (e) => { e.stopPropagation(); setOpenCourseType(false); }
                            }
                         >
                            <IconNew name='CrossM' />
                         </div>
                      </div>
                   )}
                  {publishStatusTypes.map((publishStatus) => {
                     if (publishStatusType().type === publishStatus.type) {
                        return null;
                     }
                     return (
                        <div
                           key={ publishStatus.type }
                           role='presentation'
                           onClick={ (e) => handleChangeScheduled(e, publishStatus) }
                        >
                           <Status
                              text={ publishStatus.text === 'Drip' ? 'Scheduled' : publishStatus.text }
                              type={ publishStatus.type }
                              icon={ publishStatus.icon }
                           />
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
      </>
   );
};

ChooseStatus.propTypes = {
   isPublished: PropTypes.any,
   onClick: PropTypes.func,
   openModal: PropTypes.func,
   publishDate: PropTypes.any,
   publishTime: PropTypes.any,
   onlyIcon: PropTypes.bool,
   isMob: PropTypes.bool,
   isCommunity: PropTypes.bool,
};

ChooseStatus.defaultValue = {

};

export default ChooseStatus;
