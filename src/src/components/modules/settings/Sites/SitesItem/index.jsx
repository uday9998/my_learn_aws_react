import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Popover from '@material-ui/core/Popover';
import Text, { TYPES as txtTypes, SIZES as txtSize } from 'components/elements/TextNew';
import DeleteModal from 'components/elements/DeleteModal';

const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;

const SitesItem = ({
   site, onEdit, onView, onDelete,
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

   return (
      <tr className='site-table-line'>
         <td>
            <Text
               inner={ site.name }
               type={ txtTypes.regularDefault }
               size={ txtSize.small }
            />
         </td>
         <td>
            <Text
               inner={ site.subdomain || '' }
               type={ txtTypes.regularDefault }
               size={ txtSize.small }
            />
         </td>
         <td>
            <Text
               inner={ site.is_domain_pointed ? site.domain : `${ site.subdomain }.${ apiUrl }` }
               type={ txtTypes.regularDefault }
               size={ txtSize.small }
               style={ { textDecoration: 'underline' } }
            />
         </td>
         {!site.is_main ? (
            <td
               role='presentation'
               className='site-table-more'
               onClick={ (e) => {
                  setIsOpenTriangle(!isOpenTriangle);
                  setAnchorEl(e.currentTarget);
               } }
            >
               <IconNew name='ToggleMoreM' />
            </td>
         ) : (
            <td
               className='site-table-more'
            />
         )}
         {isOpenDeleteModal ? (
            <DeleteModal
               title='Are you sure you want to delete your site?'
               deleteText='Delete'
               onDelete={ () => onDelete(site.uuid, site.subdomain) }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         ) : ''}
         <Popover
            open={ isOpenTriangle }
            anchorEl={ anchorEl }
            onClose={ () => setIsOpenTriangle(false) }
            className='custom-popover'
            elevation={ 24 }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'right',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
         >
            <div className='sitePopup__content__popover'>
               <div className='sitePopup__content__flex'>
                  <div
                     className='site__popup__item'
                     role='presentation'
                     onClick={ () => {
                        setIsOpenTriangle(false);
                        onView(site.uuid, site.subdomain);
                     } }
                  >
                     <IconNew name='PreviewSettingsM' />
                     <Text inner='Login' size={ txtSize.small } type={ txtTypes.regularDefault } />
                  </div>
                  <div
                     className='site__popup__item'
                     role='presentation'
                     onClick={ () => {
                        setIsOpenTriangle(false);
                        onEdit(site.uuid);
                     } }
                  >
                     <IconNew name='EditSettingsM' />
                     <Text inner='Edit' size={ txtSize.small } type={ txtTypes.regularDefault } />
                  </div>
                  <div
                     className='site__popup__delete'
                     role='presentation'
                     onClick={ () => {
                        setIsOpenDeleteModal(true);
                        setIsOpenTriangle(false);
                     } }
                  >
                     <IconNew name='TrashSettingsM' />
                     <Text inner='Delete' size={ txtSize.small } type={ txtTypes.regularDefault } />
                  </div>
               </div>
            </div>
         </Popover>
      </tr>
   );
};

SitesItem.propTypes = {
   site: PropTypes.object,
   onEdit: PropTypes.func,
   onView: PropTypes.func,
   onDelete: PropTypes.func,
};

export default SitesItem;
