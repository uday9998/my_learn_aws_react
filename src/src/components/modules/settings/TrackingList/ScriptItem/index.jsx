import React, { useState } from 'react';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import Modal from 'components/elements/Modal';
import './index.scss';

const ScriptItem = ({
   script, chooseScript, deleteScript, setAddNewScript,
}) => {
   const [deleteScriptModalIsOpen, setDeleteScriptModalIsOpen] = useState(false);
   const [scriptId, seScriptId] = useState(0);


   const delScriptModalClick = (id) => {
      seScriptId(id);
      setDeleteScriptModalIsOpen(true);
   };

   const delScriptModalApproveClick = () => {
      deleteScript(scriptId);
      setDeleteScriptModalIsOpen(false);
   };


   return (
      <div>
         <div className='script-view-block'>
            <div className='textArea__div'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.small }
                  inner={ script.script }
               />
               <div className='script__edit' role='presentation' onClick={ () => { chooseScript(script.id); setAddNewScript(false); } }>
                  <Icon name='EditItem' />
               </div>
            </div>
            <div className='script__delete' role='presentation' onClick={ () => delScriptModalClick(script.id) }>
               <Icon name='Delete' />
            </div>
         </div>
         {
            deleteScriptModalIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  onClose={ () => setDeleteScriptModalIsOpen(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => setDeleteScriptModalIsOpen(false) }
                        onApprove={ () => delScriptModalApproveClick() }
                        title='Delete Script'
                        content='Are you sure you want to delete this script?'
                     />
                  </div>
               </Modal>
            )
         }
      </div>
   );
};

ScriptItem.propTypes = {
   script: PropTypes.object,
   chooseScript: PropTypes.func,
   deleteScript: PropTypes.func,
   setAddNewScript: PropTypes.func,
};


export default ScriptItem;
