import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import IconNew from 'components/elements/iconsSize';
import Status from 'components/elements/statusNew';
import moment from 'moment';
import Router from 'routes/router';
import { useHistory } from 'react-router';

const ResultItem = ({
   item, resetResult,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState('');
   const history = useHistory();
   const goToUserResultPage = () => {
      history.push(`${ Router.route('ADMIN_QUIZ_RESULT').getCompiledPath({ id: item.quiz_id, resultId: item.id }) }`);
   };
   const statusType = (status) => {
      let statusText = '';
      let type = '';
      switch (status) {
         case 0: statusText = 'Failed'; type = 'failed';
            break;
         case 1: statusText = 'Passed'; type = 'passed';
            break;
         default:
      }
      return { statusText, type };
   };
   return (

      <tr className='result__new__table__item'>
         <td>
            <img src={ item.user.picture_full_src } alt='user' className='result__new__table__item__img' />
            <Text
               inner={ item.user.name }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </td>
         <td className='result__new__table__end'>
            <Text
               inner={ item.user.email }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </td>
         <td className='result__new__table__end'>
            <Text
               inner={ item.completed_at ? moment(item.completed_at).format('MMMM D, YYYY') : '-' }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </td>
         <td
            className='result__new__table__end'>
            <Status text={ statusType(item.status).statusText } type={ statusType(item.status).type } />
         </td>
         <td
            className='result__new__table__end'
            style={ {
               textAlign: 'center',
            } }>
            <Text
               inner={ item.percantage }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </td>
         <td>
            <div className='result__new__table__actions'>
               <div onClick={ () => goToUserResultPage() } role='presentation'><IconNew name='eyeM' color='rgb(19, 31, 30)' /></div>
               <DropTriggle
                  activeStyles={ {
                     background: '#E8F2F1', border: '1px solid #36796F', boxShadow: ' 0px 0px 4px #54938B',
                  } }
                  options={ [
                     {
                        trash: false, iconName: 'RefundM', name: 'Reset Results', onClick: () => setIsOpenDeleteModal(true),
                     },
                  ] }
               />
            </div>
            {isOpenDeleteModal && (
               <DeleteModal
                  title={ `Are you sure you want to reset results [${ item.user.name }] quiz` }
                  subtitle='It is better to do this when the user asks you to do it. If he wants, for example, to take the quiz again.'
                  deleteText='Reset Results'
                  maxWidth={ 415 }
                  onDelete={ () => { resetResult(item.id); setIsOpenDeleteModal(false); } }
                  onCancel={ () => setIsOpenDeleteModal(false) }
               />
            )}
         </td>
      </tr>

   );
};

ResultItem.propTypes = {
   item: PropTypes.object,
   resetResult: PropTypes.func,
};

export default ResultItem;
