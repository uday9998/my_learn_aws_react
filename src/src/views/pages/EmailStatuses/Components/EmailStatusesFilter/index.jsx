import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SortButton from 'components/elements/buttons/SortButton';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import CheckBox from 'components/elements/form/CheckBoxNew';

const filterOptions = {
   not: 'None',
   sent: 'Sent',
   draft: 'Draft',
   scheduled: 'Scheduled',
};

const sortingOptions = {
   'recently': 'Recently Updated',
   'newest': 'Newest',
   'oldest': 'Oldest',
};

const EmailStatusesFilter = ({
   filterState,
   onChange,
   isMobile,
   isMultiselect,
   setIsMultiselect,
   emailStatuses,
   checkedIds,
   handleCheckAllItems,
   handleMultiDelete,
}) => {
   const notSentEmails = emailStatuses.filter(email => email.status !== 'delivered');
   return (
      <div
         className='email__statuses__filter'
      >
         <div
            className='email__statuses__filter__left'
         >
            {
               emailStatuses.filter(email => email.status === 'delivered').length === emailStatuses.length ? (
                  <Text
                     inner={ `${ isMultiselect ? `${ checkedIds.length }/` : '' }${ emailStatuses.length } Emails` }
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                  />
               ) : (
                  <>
                     <div>
                        {
                           isMultiselect && (
                              <CheckBox
                                 iconType='asd'
                                 checked={ checkedIds.length === notSentEmails.length }
                                 onChange={ () => handleCheckAllItems(
                                    checkedIds.length === notSentEmails.length
                                       ? []
                                       : notSentEmails.map(item => item.id)
                                 ) }
                              />
                           )
                        }
                        <Text
                           inner={ `${ isMultiselect ? `${ checkedIds.length }/` : '' }${ emailStatuses.length } Emails` }
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                        />
                     </div>
                     <div>
                        {
                           emailStatuses.length > 1 && (
                              <Switch
                                 value={ isMultiselect }
                                 onChange={ setIsMultiselect }
                                 positionText='right'
                                 label='Multiselect'
                                 size='big'
                              />
                           )
                        }
                        {isMultiselect && checkedIds.length > 0 && (
                           <div
                              className='email__statuses__filter__left__actions'
                           >
                              <Text
                                 inner='Actions: '
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                              <div
                                 className='delete__wrapper'
                                 role='presentation'
                                 onClick={ handleMultiDelete }
                              >
                                 <IconNew name='CertificatesDeleteS' />
                              </div>
                           </div>
                        )}
                     </div>
                  </>
               )
            }
         </div>
         <div
            className='email__statuses__filter__right'
         >
            <SortButton
               value={ filterState.filter_by }
               filterType='Filter'
               iconName='FilterM'
               isNewIcon={ true }
               options={ filterOptions }
               onFilter={ (value) => onChange('filter_by', value) }
            />
            <SortButton
               type='first'
               onFilter={ (value) => onChange('sort', value) }
               value={ filterState.sort }
               options={ sortingOptions }
            />
         </div>
      </div>
   );
};

EmailStatusesFilter.propTypes = {
   filterState: PropTypes.object,
   onChange: PropTypes.func,
   isMobile: PropTypes.bool,
   isMultiselect: PropTypes.bool,
   setIsMultiselect: PropTypes.func,
   emailStatuses: PropTypes.array,
   checkedIds: PropTypes.array,
   handleCheckAllItems: PropTypes.func,
   handleMultiDelete: PropTypes.func,
};

export default EmailStatusesFilter;
