import React, { useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';

const ShowQuiz = ({
   number, question, answers, switchToEdit, onDelete,
}) => {
   const [popupIsOpen, setPopupIsOpen] = useState(false);
   const popupRef = useRef(null);
   const openPopupRef = useRef(null);

   useOutsideClickDetector(popupRef, () => setPopupIsOpen(false), openPopupRef);

   return (
      <div className='showQuiz'>
         <div className='showQuiz__number'>
            <Text
               type={ textType.regular }
               size={ textSize.small }
               inner={ `Question ${ number }` }
               color='#8a94a2'
               bold
            />
            <div className='showQuiz__actions'>
               <div
                  className='showQuiz__icon'
                  role='presentation'
                  onClick={ () => setPopupIsOpen(!popupIsOpen) }
                  ref={ openPopupRef }
               >
                  <Icon
                     name='Dotes'
                  />
               </div>
               {
                  popupIsOpen && (
                     <div className='showQuiz__popup' ref={ popupRef }>
                        <div
                           className='flex align-center'
                           role='presentation'
                           onClick={ () => switchToEdit() }
                        >
                           <div>
                              <Icon name='EditItem' />
                           </div>
                           <div className='m-l-m'>
                              <Text
                                 type={ textType.normal }
                                 size={ textSize.small }
                                 inner='Edit'
                              />
                           </div>
                        </div>
                        <div
                           className='flex align-center m-t-exs'
                           role='presentation'
                           onClick={ () => onDelete() }
                        >
                           <div>
                              <Icon name='DeleteItem' />
                           </div>
                           <div className='m-l-m'>
                              <Text
                                 type={ textType.normal }
                                 size={ textSize.small }
                                 inner='Delete'
                              />
                           </div>
                        </div>
                     </div>
                  )
               }
            </div>
         </div>
         <div className='showQuiz__question'>
            <Text
               type={ textType.bold }
               size={ textSize.medium }
               inner={ question }
               style={ { marginBottom: '36px' } }
            />
         </div>
         <div className='showQuiz__answers'>
            {
               answers.map(answer => (
                  <div className='showQuiz__answer' key={ answer.id }>
                     <Icon name={ answer.is_true ? 'Selected' : 'NotSelected' } />
                     <div className='m-l-m'>
                        <Text
                           type={ textType.regular }
                           size={ textSize.small }
                           inner={ answer.description }
                        />
                     </div>
                  </div>
               ))
            }
         </div>

      </div>
   );
};

ShowQuiz.propTypes = {
   number: PropTypes.number,
   question: PropTypes.string,
   answers: PropTypes.array,
   switchToEdit: PropTypes.func,
};

export default ShowQuiz;
