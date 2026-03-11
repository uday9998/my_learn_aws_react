import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as TextType,
   SIZES as TextSize,
} from 'components/elements/TextNew';
import './index.scss';
import LoaderMini from 'components/elements/loaderMini';

const EmailTrackingData = ({ numbers }) => {
   return (
      <div className='email__tracking__data__view'>
         <div className='email__tracking__data__view__section'>
            <div className='block'>
               <div className='left'>
                  <Text
                     inner='Sent Emails'
                     type={ TextType.regular148 }
                     size={ TextSize.medium }
                  />
                  <Text
                     inner='Total number of sent emails'
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                  />
               </div>
               <div className='right' style={ { background: '#E8F2F1' } }>
                  {numbers.sent !== undefined ? (
                     <Text
                        inner={ numbers.sent || '0' }
                        type={ TextType.mediumSmall }
                        style={ { color: '#24554E' } }
                        size={ TextSize.medium }
                     />
                  ) : (
                     <LoaderMini color='#24554E' />
                  )}
               </div>
            </div>
            <div className='block'>
               <div className='left'>
                  <Text
                     inner='Click Emails'
                     type={ TextType.regular148 }
                     size={ TextSize.medium }
                  />
                  <Text
                     inner='Total number of click emails'
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                  />
               </div>
               <div className='right' style={ { background: '#FAEBF8' } }>
                  {numbers.click !== undefined ? (
                     <Text
                        inner={ numbers.click || '0' }
                        type={ TextType.mediumSmall }
                        style={ { color: '#BD30B7' } }
                        size={ TextSize.medium }
                     />
                  ) : (
                     <LoaderMini color='#BD30B7' />
                  )}
               </div>
            </div>
            <div className='block'>
               <div className='left'>
                  <Text
                     inner='Bounce Emails'
                     type={ TextType.regular148 }
                     size={ TextSize.medium }
                  />
                  <Text
                     inner='Total number of bounce emails'
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                  />
               </div>
               <div className='right' style={ { background: '#FFF1F1' } }>
                  {numbers.bounces !== undefined ? (
                     <Text
                        inner={ numbers.bounces || '0' }
                        type={ TextType.mediumSmall }
                        style={ { color: '#D12D36' } }
                        size={ TextSize.medium }
                     />
                  ) : (
                     <LoaderMini color='#D12D36' />
                  )}
               </div>
            </div>
         </div>
         <div className='email__tracking__data__view__section'>
            <div className='block'>
               <div className='left'>
                  <Text
                     inner='Open Emails'
                     type={ TextType.regular148 }
                     size={ TextSize.medium }
                  />
                  <Text
                     inner='Total number of open emails'
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                  />
               </div>
               <div className='right' style={ { background: '#F1F6FF' } }>
                  {numbers.open !== undefined ? (
                     <Text
                        inner={ numbers.open || '0' }
                        type={ TextType.mediumSmall }
                        style={ { color: '#3060BD' } }
                        size={ TextSize.medium }
                     />
                  ) : (
                     <LoaderMini color='#3060BD' />
                  )}
               </div>
            </div>
            <div className='block'>
               <div className='left'>
                  <Text
                     inner='Sales Emails'
                     type={ TextType.regular148 }
                     size={ TextSize.medium }
                  />
                  <Text
                     inner='Total number of sales emails'
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                  />
               </div>
               <div className='right' style={ { background: '#FFF6D7' } }>
                  {numbers.sales !== undefined ? (
                     <Text
                        inner={ numbers.sales || '0' }
                        type={ TextType.mediumSmall }
                        style={ { color: '#AC890A' } }
                        size={ TextSize.medium }
                     />
                  ) : (
                     <LoaderMini color='#AC890A' />
                  )}
               </div>
            </div>
            <div className='block'>
               <div className='left'>
                  <Text
                     inner='Unsubscribe Emails'
                     type={ TextType.regular148 }
                     size={ TextSize.medium }
                  />
                  <Text
                     inner='Total number of sales emails'
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                  />
               </div>
               <div className='right' style={ { background: '#F6F1FF' } }>
                  {numbers.unsubscribe !== undefined ? (
                     <Text
                        inner={ numbers.unsubscribe || '0' }
                        type={ TextType.mediumSmall }
                        style={ { color: '#8830BD' } }
                        size={ TextSize.medium }
                     />
                  ) : (
                     <LoaderMini color='#8830BD' />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

EmailTrackingData.propTypes = {
   numbers: PropTypes.object,
};

export default EmailTrackingData;
