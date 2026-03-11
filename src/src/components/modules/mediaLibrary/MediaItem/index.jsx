import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import { getMediaIconByMimeType } from 'utils/mediaLibrary';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import icons from './icons';
import Editable from '../Editable';

function MediaItem({
   onEditStart,
   onEditChange,
   onEditCancel,
   onEdit,
   onShow,
   mimeType,
   onDeleteStart,
   onDownload,
   name,
   type,
   canDelete,
   id,
   createdAt,
   mode = {},
   mediaId,
}) {
   const icon = getMediaIconByMimeType(mimeType, type);
   const formatedDate = createdAt ? createdAt.split(' ')[0] : '';
   const [popupIsOpen, setPopupIsOpen] = useState(false);

   function openPopup(e) {
      e.stopPropagation();
      setPopupIsOpen(!popupIsOpen);
   }

   useEffect(() => {
      if (window.innerWidth >= 1024) {
         setPopupIsOpen(true);
      }
   });
   const FilterFormatDate = `${ formatedDate.slice(0, 10) } ${ formatedDate.slice(11, 19) }`;
   return (
      <div className='mediaLibrary__item'>
         <div className='mediaLibrary__item__name'>
            <Icon name={ icon } />
            <div className='mediaLibrary__item__name__mob'>
               <div className='mediaLibrary__item__name_title'>
                  {
                     mode.mode === 'edit' && mode.data && `${ mode.data.id }-${ mode.data.title ? 'title' : 'name' }` === mediaId
                  && (
                     <Editable
                        value={ mode.data.title ? mode.data.title : mode.data.name }
                        onChange={ onEditChange }
                        onCancel={ onEditCancel }
                        onSubmit={ onEdit }
                        foucused
                     />
                  )
                  }
                  {
                     (!mode.mode || !(['edit', 'edit-submit'].includes(mode.mode) && mode.data.id === id))
              && (
                 (<span>{name}</span>)
              )
                  }
                  {
                     (mode.mode === 'edit-submit' && mode.data.id === id)
              && (
                 (<span>{ mode && mode.data && mode.data.name}</span>)
              )
                  }
               </div>
               <div className='mediaLibrary__item__date__mob'>
                  <span>{FilterFormatDate}</span>
               </div>
            </div>
         </div>
         <div className='mediaLibrary__item__date'>
            <span>{FilterFormatDate}</span>
         </div>
         <div className='mediaLibrary__item__actions'>
            <div onClick={ (e) => openPopup(e) } role='presentation' className='dotes__mob'>
               <Icon name='dotes' />
            </div>
            {popupIsOpen && (
               <ClickOutside onClick={ (e) => {
                  if (window.innerWidth < 1023) {
                     openPopup(e);
                  }
               } }
               >
                  <div className='mediaLibrary__item__action__mob'>
                     { (!mode.mode || !(['edit', 'edit-submit'].includes(mode.mode) && mode.data.id === id))
               && (
                  <button onClick={ onEditStart } type='button' className='mediaLibrary__item__action'>
                     <img src={ icons.edit } alt='edit' />
                  </button>
               )
                     }
                     <button onClick={ onShow } type='button' className='mediaLibrary__item__action'>
                        <img src={ icons.preview } alt='preview' />
                     </button>
                     <button onClick={ onDownload } type='button' className='mediaLibrary__item__action'>
                        <img src={ icons.download } alt='download' />
                     </button>
                     {
                        canDelete
                           ? (
                              <button onClick={ onDeleteStart } type='button' className='mediaLibrary__item__action'>
                                 <img src={ icons.delete } alt='delet' />
                              </button>
                           ) : (
                              <button type='button' className='mediaLibrary__item__action delete__hint'>
                                 <Icon name='Hint' className='mediaLibrary__item__action' />
                                 <span className='delete__hint_msg textBasic dont-break-out textBasic_type_normal textBasic_size_extraSmall'>You can not delete the file as it has been used in one of your lessons.</span>
                              </button>
                           )}
                  </div>
               </ClickOutside>
            )}
         </div>
      </div>
   );
}

MediaItem.propTypes = {
   onEditStart: PropTypes.func,
   onShow: PropTypes.func,
   onDeleteStart: PropTypes.func,
   canDelete: PropTypes.bool,
   mimeType: PropTypes.string,
   onDownload: PropTypes.func,
   onEdit: PropTypes.func,
   onEditChange: PropTypes.func,
   onEditCancel: PropTypes.func,
   name: PropTypes.string,
   createdAt: PropTypes.string,
   id: PropTypes.number,
   type: PropTypes.string,
   mode: PropTypes.object,
   mediaId: PropTypes.string,
};

export default MediaItem;
