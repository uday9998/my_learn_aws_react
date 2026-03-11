import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import CheckList from 'components/elements/checkListNew';
import './index.scss';
import Info from 'components/elements/messages/info';
import UploadImage from 'components/modules/uploadImage';
import Line from 'components/elements/Line';
import ApproveModal from 'components/elements/ApproveModal';


const PlanMainRight = ({
   status, onChange, image, plan,
}) => {
   const [openModal, setOpenModal] = useState(false);

   const statuses = [
      { color: 'grey', text: 'Unpublished', iconName: 'UnpublishedPlanS' },
      { color: 'green', text: 'Published', iconName: 'PublishedPlanS' },
      { color: 'test', text: 'Test Mode', iconName: 'TestModePlanS' },
   ];
   const texts = [
      'The published status will be visible on your checkout page',
      'Test mode allows you to activate it to test your payment plan and make sure it works. This is not an A/B test.',
      'Unpublished plan will be visible only to you. You can publish it whenever you want.',
   ];

   const checListContent = [
      {
         value: 1,
         content: (
            <SimpleStatus
               { ...statuses[1] }
            />
         ),
      },
      {
         value: 2,
         content: (
            <SimpleStatus
               { ...statuses[2] }
            />
         ),
      },
      {
         value: 0,
         content: (
            <SimpleStatus
               { ...statuses[0] }
            />
         ),
      },
   ];
   const getStatusText = () => {
      switch (status) {
         case 1:
            return texts[0];
         case 2:
            return texts[1];
         default:
            return texts[2];
      }
   };

   const isCheckedPricing = () => {
      let isChecked = false;
      if (plan.pricings && plan.pricings.length > 0) {
         for (let i = 0; i < plan.pricings.length; i++) {
            // code
            if (plan.pricings[i].pricing_type === 0) {
               isChecked = true;
               break;
            } else if (plan.pricings[i].payment_method) {
               isChecked = true;
               break;
            }
         }
      }
      return isChecked;
   };

   return (
      <div className='plan__main__right'>
         <Text
            inner='Bundle Status'
            type={ types.mediumLarge }
            size={ sizes.small }
         />
         <CheckList
            onChange={ (val) => {
               onChange('status', val);
               if (val === 1 && !isCheckedPricing()) {
                  // setOpenModal(true);
               }
            } }
            values={ [status] }
            items={ checListContent }
         />
         <div className='plan__main__right__liner' />
         <Info
            title={ getStatusText() }
            isHaveCancel={ false }
         />
         <Line />
         <UploadImage
            label='Bundle Cover'
            isUpload={ true }
            name='picture_src'
            onChange={ (name, url) => onChange('picture_src', url) }
            isOptional={ true }
            src={ image }
            otherProps={ {
               cropRatio: '320x180',
               generalButtonProps: {
                  isIconRight: true,
                  iconName: 'DefaultUpload',
               },
            } }
            size='full'
            cropRatio='1920x1080'
            isImageUpload={ true }
         />
         {openModal && (
            <ApproveModal
               title='Warning'
               btnText='Okay'
               onApprove={ () => { setOpenModal(false); } }
               withoutCancel={ true }
               onCancel={ () => {} }
            >
               <Text
                  inner='You are about to publish an offer without payment method selection.
                  Please note that the offer will have just an informative view and the member can not purchase it.'
                  type={ types.regularDefault }
                  size={ sizes.small14 }
               />
            </ApproveModal>
         )}
      </div>
   );
};

PlanMainRight.propTypes = {
   status: PropTypes.number,
   onChange: PropTypes.func,
   image: PropTypes.string,
   plan: PropTypes.object,
};

export default PlanMainRight;
