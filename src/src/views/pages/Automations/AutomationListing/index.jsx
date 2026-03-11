import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import moment from 'moment';
import Switch from 'components/elements/switchNew';
import SliceAndConnectText from 'utils/getSplitedText';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import AutomationItemMobile from './AutomationItemMobile';

const AutomationListing = ({
   data,
   handleStatusChange,
   openAutomation,
   handleDeleteAutomation,
   isMobile,
}) => {
   const [deleteModal, setDeleteModal] = React.useState({
      isOpen: false,
   });
   return (
      <div className='automation__listing'>
         {deleteModal.isOpen && (
            <DeleteModal
               maxWidth={ 414 }
               title={ `Are you sure you want to delete [${ deleteModal.name }] automation?` }
               onDelete={ () => { handleDeleteAutomation(deleteModal.id); setDeleteModal({ isOpen: false }); } }
               onCancel={ () => setDeleteModal({ isOpen: false }) }
               deleteText='Delete'
            />
         )}
         {
            isMobile ? (
               <div
                  className='mobile__automation__wrapper'
               >
                  {
                     data.map(e => (
                        <AutomationItemMobile
                           key={ e.id }
                           item={ e }
                           openAutomation={ () => openAutomation(e.id) }
                           onDelete={ event => {
                              event.preventDefault();
                              event.stopPropagation();
                              setDeleteModal({ isOpen: true, ...e });
                           } }
                           date={ moment(e.created_at).format('l') }
                           handleStatusChange={ handleStatusChange }
                        />
                     ))
                  }
               </div>
            ) : (
               <table>
                  <thead>
                     <th>
                        <Text
                           inner='Name'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                     <th>
                        <Text
                           inner='Last updated'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                     <th>
                        <Text
                           inner='Active'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                     <th style={ { textAlign: 'end' } }>
                        <Text
                           inner='Actions'
                           style={ { textAlign: 'end' } }
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                  </thead>
                  <tbody>
                     {data.map((e) => {
                        return (
                           <tr role='presentation' onClick={ () => openAutomation(e.id) }>
                              <td>
                                 <Text
                                    inner={ SliceAndConnectText(e.name, 30) }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textTransform: 'capitalize' } }
                                 />
                              </td>
                              <td>
                                 <Text
                                    inner={ moment(e.updated_at).format('MMMM DD, YYYY') }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                 />
                              </td>
                              <td>
                                 <Switch
                                    value={ !!e.status }
                                    onChange={ (value) => handleStatusChange(e.id, value) }
                                    size='medium'
                                 />
                              </td>
                              <td>
                                 <div className='automation__listing__actions'>
                                    <IconButton
                                       onClick={ () => openAutomation(e.id) }
                                       name='AffiliateEditM'
                                    />
                                    <IconButton
                                       onClick={ (event) => {
                                          event.preventDefault();
                                          event.stopPropagation();
                                          setDeleteModal({ isOpen: true, ...e });
                                       } }
                                       name='AffiliateDeleteM'
                                    />
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            )
         }
      </div>
   );
};

AutomationListing.propTypes = {
   data: PropTypes.array,
   handleStatusChange: PropTypes.func,
   openAutomation: PropTypes.func,
   handleDeleteAutomation: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default AutomationListing;
