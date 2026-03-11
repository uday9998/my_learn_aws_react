import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import './index.scss';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import IconNew from 'components/elements/iconsSize';
import moment from 'moment';

const QuizItem = ({
   item, onCheck, isMultiSelect, isChecked, duplicateQuiz, deleteQuiz,
   goToEditPage, goToSettingsPage,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState('');

   return (

      <tr className='quiz__new__table__item'>
         {isMultiSelect && (
            <td className='quiz__new__table__space'>
               <CheckBox
                  checked={ isChecked }
                  onChange={ () => onCheck(item.id) }
               />
            </td>
         )}
         <td>
            <Text
               inner={ item.name }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </td>
         <td className='quiz__new__table__end'>
            <Text
               inner={ item.questions_count }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </td>
         <td className='quiz__new__table__end'>
            <Text
               inner={ moment(item.updated_at).format('MMMM D, YYYY') }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </td>
         <td>
            <div className='quiz__new__table__actions'>
               {/* <div><IconNew name='chartPieM' /></div> */}
               <div role='presentation' title='Edit Quiz' onClick={ () => goToEditPage(item.id) }>
                  <IconNew name='EditMediaM' />
               </div>
               <div role='presentation' onClick={ () => goToSettingsPage(item.id, true) }><IconNew name='eyeM' color='rgb(19, 31, 30)' /></div>
               <DropTriggle
                  activeStyles={ {
                     background: '#E8F2F1', border: '1px solid #36796F', boxShadow: ' 0px 0px 4px #54938B',
                  } }
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
            {isOpenDeleteModal && (
               <DeleteModal
                  title={ `Are you sure you want to delete the [${ item.name }] quiz` }
                  deleteText='Delete'
                  maxWidth={ 415 }
                  onDelete={ () => { deleteQuiz(item.id); setIsOpenDeleteModal(false); } }
                  onCancel={ () => setIsOpenDeleteModal(false) }
               />
            )}
         </td>
      </tr>

   );
};

QuizItem.propTypes = {
   onCheck: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   isChecked: PropTypes.bool,
   deleteQuiz: PropTypes.func,
   duplicateQuiz: PropTypes.func,
   item: PropTypes.object,
   goToSettingsPage: PropTypes.func,
   goToEditPage: PropTypes.func,
};

export default QuizItem;
