import React, { useRef, useState } from 'react';
import Tabs from 'components/elements/tabs';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import classnames from 'classnames';
import QuizTypes from '../QuestionTypes';
import SavedTemplates from './SavedTemplates';

const Quiz = ({
   chooseQuestionType, quizTemplatesDesc, quizTemplatesAsc, chooseSavedTemplate,
}) => {
   const wrapperRef = useRef(null);

   const tabVariants = [
      { value: 'create', key: 'Create New', iconName: 'UploadMediaFirstM' },
      { value: 'saved_templates', key: 'Saved Templates', iconName: 'UploadMediaSecondM' },
   ];

   const [selectedTab, setSelectedTab] = useState('create');
   const [openTypes, setOpenTypes] = useState(false);
   const [openTypeView, setOpenTypeView] = useState('');


   return (
      <div className='quiz__template' ref={ wrapperRef }>
         <>
            <div
               className='quiz__template__tab'
               style={ { marginBottom: selectedTab === 'upload' ? '-8px' : '0px' } }
            >
               <Tabs
                  variants={ tabVariants }
                  selectedVariant={ selectedTab }
                  isButton={ false }
                  onSelect={ (value) => {
                     setSelectedTab(value);
                  } }
                  hasIcon={ true }
               />
            </div>
            {selectedTab === 'create' && (
               <div className={ classnames({
                  'quiz__template__content': !openTypes,
                  'quiz__template__content__withtypes': openTypes,
               }) }
               >
                  <div className='quiz__icon'><IconNew name='QuizM' /></div>
                  {!openTypes && (
                     <BaseButton
                        theme={ btnTheme.primary }
                        size={ btnSizes.large }
                        text='Create Quiz'
                        iconName='Plus'
                        isIconRight={ true }
                        onClick={ () => setOpenTypes(true) }
                     />
                  )}
                  {openTypes && (
                     <QuizTypes
                        setOpenTypeView={ setOpenTypeView }
                        openTypeView={ openTypeView }
                        chooseQuestionType={ chooseQuestionType }
                        hasEnding={ true }
                     />
                  )}

               </div>
            )}
            {selectedTab === 'saved_templates' && (
               <SavedTemplates
                  quizTemplatesAsc={ quizTemplatesAsc }
                  quizTemplatesDesc={ quizTemplatesDesc }
                  chooseSavedTemplate={ chooseSavedTemplate }
               />
            )}
         </>
      </div>
   );
};

Quiz.propTypes = {
   chooseQuestionType: PropTypes.func,
   quizTemplatesAsc: PropTypes.array,
   quizTemplatesDesc: PropTypes.array,
   chooseSavedTemplate: PropTypes.func,
};


export default Quiz;
