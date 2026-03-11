import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import Button from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import DeleteModal from 'components/elements/DeleteModal';
import DropTriggle from 'components/elements/newDropTriggle';

const HeaderPLan = ({
   planName, onSave, onDelete, goBack, courses, isHaveCoursesToDelete, isMobile,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const publishedCourseNames = courses.filter((e) => e.is_published === 1).map((e) => e.name);

   const endsWithTenNumbers = (text) => {
      if (/\d{10}$/.test(text)) {
         return text.slice(0, -10);
      }

      return text;
   };

   return (
      <>
         {isOpenDeleteModal && (
            <DeleteModal
               onDelete={ () => onDelete() }
               onCancel={ () => setIsOpenDeleteModal(false) }
               maxWidth={ 414 }
               deleteText='Delete'
               description={ isHaveCoursesToDelete ? `After deleting this plan the following programs will be unpublished: [${ publishedCourseNames.join(',') }]` : null }
               title={ `Are you sure you want to delete [${ planName }] plan?` }
            />
         )}
         <div className='header__plan'>
            <div className='header__plan__left'>
               {goBack && (
                  <>
                     <Icon name='ArrowBackNew' onClick={ goBack } />
                     <Text
                        inner={ endsWithTenNumbers(planName) }
                        type={ types.regularMin }
                        size={ sizes.size_28 }
                        style={ {
                           fontWeight: '600',
                        } }
                     />
                  </>
               )}
            </div>
            <div className='header__plan__right'>
               {
                  !isMobile && onDelete && (
                     <div
                        className='header__plan__right__delete'
                        role='presentation'
                        onClick={ () => setIsOpenDeleteModal(true) }
                     >
                        <IconNew name='DeleteMediaM' />
                     </div>
                  )
               }
               <Button
                  text='Save Changes'
                  onClick={ onSave }
               />
               {
                  isMobile && (
                     <div
                        style={ {
                           transform: 'rotate(90deg)',
                        } }
                     >
                        <DropTriggle
                           options={ [
                              {
                                 trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => { setIsOpenDeleteModal(true); },
                              },
                           ] }
                        />
                     </div>
                  )
               }
            </div>
         </div>
      </>
   );
};

HeaderPLan.propTypes = {
   planName: PropTypes.string,
   onSave: PropTypes.func,
   onDelete: PropTypes.func,
   goBack: PropTypes.any,
   courses: PropTypes.array,
   isHaveCoursesToDelete: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default HeaderPLan;
