import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useHistory } from 'react-router';
import Router from 'routes/router';
import IconNew from 'components/elements/iconsSize';
import DropTriggle from 'components/elements/newDropTriggle';
import Status from 'components/elements/statusNew';
import DeleteModal from 'components/elements/DeleteModal';

import './index.scss';
import moment from 'moment';

const ResultItemMobile = ({
   item,
   resetResult,
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
      <>
         <div className='result__list__mobile__item'>
            <div>
               <div
                  className='result__list__mobile__item__userinfo'
               >
                  <img src={ item.user.picture_full_src } alt='user' className='result__new__table__item__img' />
                  <Text
                     inner={ item.user.name }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
               <div
                  className='result__list__mobile__item__actions'
               >
                  <div
                     onClick={ () => goToUserResultPage() }
                     role='presentation'
                  >
                     <IconNew name='eyeM' color='rgb(19, 31, 30)' />
                  </div>
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
            </div>
            <div>
               <span>Email</span>
               <span>{ item.user.email }</span>
            </div>
            <div>
               <span>Completed</span>
               <span>
                  {
                     item.completed_at ? moment(item.completed_at).format('MM/DD/YYYY hh:mm A') : '-'
                  }
               </span>
            </div>
            <div>
               <span>Status</span>
               <Status
                  text={ statusType(item.status).statusText }
                  type={ statusType(item.status).type }
               />
            </div>
            <div>
               <span>Results</span>
               <span>{item.percantage}</span>
            </div>
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
      </>
   );
};

ResultItemMobile.propTypes = {
   item: PropTypes.object,
   resetResult: PropTypes.func,
};

export default ResultItemMobile;
