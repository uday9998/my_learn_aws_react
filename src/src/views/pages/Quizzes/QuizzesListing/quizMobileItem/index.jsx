import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/elements/form/CheckBoxNew';

import './index.scss';
import DropTriggle from 'components/elements/newDropTriggle';
import IconNew from 'components/elements/iconsSize';
import moment from 'moment';
import DeleteModal from 'components/elements/DeleteModal';

const QuizMobileItem = ({
   item,
   onCheck,
   isMultiSelect,
   isChecked,
   duplicateQuiz,
   deleteQuiz,
   goToEditPage,
   goToSettingsPage,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState('');

   return (
      <>
         <div
            className='quiz__mobile__item__wrapper'
         >
            {
               isMultiSelect && (
                  <CheckBox
                     checked={ isChecked }
                     onChange={ () => onCheck(item.id) }
                  />
               )
            }
            <div
               className='quiz__mobile__item'
            >
               <div>
                  <span>{ item.name }</span>
                  <div className='quiz__mobile__item__actions'>
                     <div
                        role='presentation'
                        title='Edit Quiz'
                        onClick={ () => goToEditPage(item.id) }
                     >
                        <IconNew name='EditMediaM' />
                     </div>
                     <div
                        role='presentation'
                        onClick={ () => goToSettingsPage(item.id, true) }
                     >
                        <IconNew name='eyeM' color='rgb(19, 31, 30)' />
                     </div>
                     <DropTriggle
                        options={ [
                           {
                              trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: () => duplicateQuiz(item.id),
                           },
                           {
                              trash: false, iconName: 'SectionSettingsM', name: 'Settings', onClick: () => goToSettingsPage(item.id),
                           },
                           {
                              trash: true, iconName: 'DeleteMediaM', name: 'Delete', onClick: () => setIsOpenDeleteModal(true),
                           },
                        ] }
                     />
                  </div>
               </div>
               <div>
                  <span>Questions</span>
                  <span>{ item.questions_count }</span>
               </div>
               <div>
                  <span>Updated At</span>
                  <span>{ moment(item.updated_at).format('MM/DD/YYYY hh:mm A') }</span>
               </div>
            </div>
         </div>
         {isOpenDeleteModal && (
            <DeleteModal
               title={ `Are you sure you want to delete the [${ item.name }] quiz` }
               deleteText='Delete'
               maxWidth={ 415 }
               onDelete={ () => { deleteQuiz(item.id); setIsOpenDeleteModal(false); } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
      </>
   );
};

QuizMobileItem.propTypes = {
   onCheck: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   isChecked: PropTypes.bool,
   deleteQuiz: PropTypes.func,
   duplicateQuiz: PropTypes.func,
   item: PropTypes.object,
   goToSettingsPage: PropTypes.func,
   goToEditPage: PropTypes.func,
};

export default QuizMobileItem;
