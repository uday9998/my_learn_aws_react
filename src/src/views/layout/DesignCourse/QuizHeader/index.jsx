import React, { useState } from 'react';

import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';

import './index.scss';

const QuizHeader = ({
   title,
   goTo,
   saveQuiz,
   handleDeleteQuiz,
   goToSettings,
   isResultPage,
   resetResult,
   isMobile,
   handleChangeQuiz,
}) => {
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const deleteQuizz = () => {
      handleDeleteQuiz();
      handleChangeQuiz('', null, false);
   };

   const handleDelete = () => {
      setShowDeleteModal(prevState => !prevState);
   };

   return (
      <div className='quiz__header'>
         {
            showDeleteModal && (
               <DeleteModal
                  deleteText='Delete'
                  onDelete={ deleteQuizz }
                  onCancel={ handleDelete }
                  title='Are you sure you want to delete the quiz?'
               />
            )
         }
         <div className='quiz__header__left'>
            <div style={ { cursor: 'pointer' } } onClick={ goTo } role='presentation'>
               <Icon name='ArrowBackHeader' />
            </div>
            <Text
               inner={ title || 'quiz' }
               type={ TextType.regularDefault }
               size={ TextSize.xlarge }
            />
         </div>
         <div className='quiz__header__right'>
            {!isResultPage
            && (
               <>
                  {
                     !isMobile && (
                        <>
                           <div role='presentation' title='Delete Quiz' onClick={ handleDelete }>
                              <IconNew name='DeleteMediaM' />
                           </div>
                           <div className='arrowGrey' />
                           <BaseButton
                              theme={ btnTheme.secondary }
                              size={ btnSizes.xsmall }
                              isIconRight={ true }
                              iconName='SectionSettingsM'
                              text='Settings'
                              onClick={ goToSettings }
                              style={ {
                                 maxHeight: '44px',
                              } }
                           />
                        </>
                     )
                  }
                  {/* <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSizes.xsmall }
                  isIconRight={ true }
                  iconName='eyeM'
                  text='Preview'
               /> */}
                  <BaseButton
                     theme={ btnTheme.primary }
                     size={ btnSizes.xsmall }
                     text='Save Quiz'
                     onClick={ () => saveQuiz(false) }
                     style={ {
                        minHeight: '44px',
                     } }
                  />
                  {
                     isMobile && (
                        <div>
                           <DropTriggle
                              options={ [
                                 {
                                    trash: false, iconName: 'SectionSettingsM', name: 'Settings', onClick: () => goToSettings(),
                                 },
                                 {
                                    trash: true, iconName: 'DeleteMediaM', name: 'Delete', onClick: () => handleDeleteQuiz(),
                                 },
                              ] }
                           />
                        </div>
                     )
                  }
               </>
            )}
            { isResultPage && (
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSizes.xsmall }
                  isIconRight={ true }
                  iconName='RefundM'
                  text='Reset Results'
                  onClick={ () => resetResult() }
               />
            )}
         </div>
      </div>
   );
};

QuizHeader.propTypes = {
   goTo: PropTypes.func,
   saveQuiz: PropTypes.func,
   title: PropTypes.string,
   handleDeleteQuiz: PropTypes.func,
   goToSettings: PropTypes.func,
   isResultPage: PropTypes.bool,
   resetResult: PropTypes.func,
   handleChangeQuiz: PropTypes.func,
   isMobile: PropTypes.bool,
};

QuizHeader.defaultValue = {
   goToBack: () => {},
   saveQuiz: () => {},
};

export default QuizHeader;
