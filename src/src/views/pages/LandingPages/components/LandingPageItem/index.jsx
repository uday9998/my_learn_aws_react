import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import defaultImage from 'assets/images/plan/default.png';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import moment from 'moment';
import SimpleStatus from 'components/elements/SimpleStatus';
import { copyToClipBoard } from 'utils/copy';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { IMAGES_BASE_URL } from 'utils/constants';
import image23 from 'assets/images/landings/preview__23__template__image.png';
import image21 from 'assets/images/landings/landing21-small.jpeg';

const LandingPageItem = ({
   landing,
   onEdit,
   onDelete,
   onDuplicate,
   onOpenSettings,
   updateLanding,
   onCheck,
   isChecked,
   isMultiSelect,
}) => {
   const statuses = [
      { color: 'grey', text: 'Unpublished', iconName: 'UnpublishedPlanS' },
      { color: 'green', text: 'Published', iconName: 'PublishedPlanS' },
   ];
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
   const getFirstOptionsParams = () => {
      if (landing.is_published === 1) {
         return {
            trash: false,
            iconName: 'UnpublishLandingM',
            name: 'Unpublish',
            onClick: () => updateLanding(),
         };
      }
      return {
         trash: false,
         iconName: 'PreviewLandingMBlack',
         name: 'Publish',
         onClick: () => updateLanding(),
      };
   };

   const imageMap = {
      14: `${ IMAGES_BASE_URL }landings/template2.webp`,
      15: `${ IMAGES_BASE_URL }landings/template3.webp`,
      16: `${ IMAGES_BASE_URL }landings/template4.webp`,
      17: `${ IMAGES_BASE_URL }landings/template1.webp`,
      18: `${ IMAGES_BASE_URL }landings/template5.webp`,
      19: `${ IMAGES_BASE_URL }landings/template6.webp`,
      20: `${ IMAGES_BASE_URL }landings/template7.webp`,
      21: image21,
      22: `${ IMAGES_BASE_URL }landings/template10.webp`,
      23: image23,
   };

   const imageSrc = imageMap[landing.landing_page_id] || defaultImage;

   const options = [
      { ...getFirstOptionsParams() },
      {
         trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: () => onDuplicate(),
      },
      // {
      //    trash: false, iconName: 'SettingsLandingM', name: 'Settings', onClick: () => onOpenSettings(),
      // },
      {
         trash: true, iconName: 'DeleteMediaM', name: 'Delete', onClick: () => setIsOpenDeletePopup(true),
      },
   ];

   return (
      <div className='landing__page__item'>
         {isOpenDeletePopup && (
            <DeleteModal
               maxWidth={ 414 }
               deleteText='Delete'
               onDelete={ () => {
                  onDelete();
                  setIsOpenDeletePopup(false);
               } }
               onCancel={ () => setIsOpenDeletePopup(false) }
               title={ `Are you sure you want to delete the [${ landing.name }] landing?` }
            />
         )}
         {
            isMultiSelect && (
               <CheckBox
                  checked={ isChecked }
                  onChange={ () => onCheck(!isChecked) }
               />
            )
         }
         <div className='landing__page__item__content'>
            <div className='landing__page__item__content__left'>
               <img src={ imageSrc } alt='imageSrc' className='landing_page_image' />
               <div className='flex'>
                  <Text
                     inner={ landing.name }
                     type={ types.regular148 }
                     style={ { cursor: 'pointer' } }
                     onClick={ () => onEdit() }
                     size={ sizes.medium }
                  />
                  <div className='date'>
                     <Text
                        inner='Last updated: '
                        type={ types.regular148 }
                        style={ { color: '#727978' } }
                        size={ sizes.xsmall }
                     />
                     <Text
                        inner={ moment(landing.updated_at).format('MMMM DD, YYYY hh:mm A') }
                        type={ types.regular148 }
                        size={ sizes.xsmall }
                        style={ { whiteSpace: 'nowrap' } }
                     />
                  </div>
                  <SimpleStatus
                     { ...statuses[landing.is_published] }
                  />
               </div>
            </div>
            <div className='landing__page__item__content__right'>
               <TextWithIcon
                  generalStyles={ { cursor: 'pointer' } }
                  iconName='CopyLandingM'
                  inner='Copy Link'
                  type={ types.regularDefault }
                  onClick={ () => copyToClipBoard(`${ window.location.origin }/p/${ landing.url }`) }
                  size={ sizes.small }
               />
               <div className='landing__page__item__content__right__line' />
               <TextWithIcon
                  inner='Preview'
                  style={ { color: '#24554E' } }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => window.open(`${ window.location.origin }/p/${ landing.url }`, '_blank') }
                  iconName='PreviewLandingM'
                  generalStyles={ { cursor: 'pointer' } }
               />
               <TextWithIcon
                  inner='Edit'
                  style={ { color: '#24554E' } }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => onEdit() }
                  iconName='EditLandingM'
                  generalStyles={ { cursor: 'pointer' } }
               />
               <DropTriggle
                  // type='one'
                  options={ options }
               />
            </div>
         </div>
      </div>
   );
};

LandingPageItem.propTypes = {
   landing: PropTypes.object,
   updateLanding: PropTypes.func,
   onDelete: PropTypes.func,
   onEdit: PropTypes.func,
   onOpenSettings: PropTypes.func,
   onDuplicate: PropTypes.func,
   onCheck: PropTypes.func,
   isChecked: PropTypes.bool,
   isMultiSelect: PropTypes.bool,
};

export default LandingPageItem;
