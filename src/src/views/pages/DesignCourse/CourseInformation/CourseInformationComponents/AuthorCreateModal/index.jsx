import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import ModalNew from 'components/elements/ModalNew';
import Input from 'components/elements/inputNew';
import Button, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import SliceAndConnectText from 'utils/getSplitedText';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';

const AuthorCreateModal = ({
   onCloseModal, authors, onCreate, deleteAuthor, isPlaylist,
   errorMessages = [], removeErrorMessage
}) => {
   const [authorNameInput, setAuthorNameInput] = React.useState('');
   const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
   const instructor = React.useRef({});

   const changeAuthorName = (name, value) => {
      if (errorMessages.length) {
         removeErrorMessage('name');
      }

      setAuthorNameInput(value);
   };

   const handleSumbit = () => {
      onCreate({
         name: authorNameInput,
      });
      setAuthorNameInput('');
   };

   if (isOpenDeleteModal) {
      return (
         <DeleteModal
            deleteText='Delete'
            maxWidth={ 414 }
            onCancel={ () => setIsOpenDeleteModal(false) }
            onDelete={ () => { deleteAuthor(instructor.current.value); setIsOpenDeleteModal(false); } }
            title={ `Are you sure you want to delete the ${ instructor.current.label } instructor ?` }
         />
      );
   }

   return (
      <ModalNew
         onCloseModal={ () => onCloseModal() }
      >
         <div className='author__modal'>
            <Text
               inner='Create Instructor'
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
            <div className='btn_input_wrapper'>
               <Input
                  errorMessages={ errorMessages }
                  value={ authorNameInput }
                  label='Instructor Name'
                  placeholder='Enter instructor name'
                  onChange={ changeAuthorName }
               />
            </div>
            <div className='author__modal__content'>
               {authors.map((e) => {
                  return (
                     <div key={ e.value } className='author__modal__content__item'>
                        <Text
                           inner={ SliceAndConnectText(e.label, 30) }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                        <IconButton
                           name='CertificatesDeleteS'
                           onClick={ () => {
                              instructor.current = e;
                              setIsOpenDeleteModal(true);
                           } }
                        />
                     </div>
                  );
               })}
            </div>
            <div className='author__modal__buttons'>
               <Button
                  text='Cancel'
                  onClick={ () => onCloseModal() }
                  theme={ btnThemes.secondary }
               />
               <Button
                  text='Save'
                  onClick={ handleSumbit }
               />
            </div>
         </div>
      </ModalNew>
   );
};

AuthorCreateModal.propTypes = {
   onCloseModal: PropTypes.func,
   authors: PropTypes.array,
   deleteAuthor: PropTypes.func,
   onCreate: PropTypes.func,
   isPlaylist: PropTypes.bool,
   errorMessages: PropTypes.array,
   removeErrorMessage: PropTypes.func,
};

export default AuthorCreateModal;
