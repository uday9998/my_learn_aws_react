
import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import Results from 'views/pages/Quizzes/Quiz/Results';
import Settings from 'views/pages/Quizzes/Quiz/Settings';
import Tabs from 'components/elements/tabs';

import './index.scss';

const tabsSelector = [
   { value: 'results', key: 'Results', iconName: 'ChartPieFilledM' },
   { value: 'settings', key: 'Settings', iconName: 'SectionSettingsTabM' },
];

const Quiz = ({
   quiz,
   goBack,
   handleSelectTab,
   selectedPage,
   quizSettings,
   onQuizSettingsChange,
   handleSaveQuiz,
   exportQuizCsv,
   isMobile,
   errorMessages,
   ...res
}) => {
   return (
      <div className='single_quiz'>
         <BreadCrumb
            links={ [
               { goTo: goBack, text: 'Quizzes list' },
               { goTo: () => {}, text: quizSettings.name || 'Best Trip Ever' },
            ] }
         />
         <div className='single_quiz_header'>
            <div>
               <Text
                  inner={ quizSettings.name || 'Best Trip Ever' }
                  type={ txtTypes.regularDefaultSmallX }
                  size={ txtSizes.size_28 }
               />
            </div>
            {selectedPage === 'results' && (
               <div>
                  <BaseButton
                     text='Export'
                     theme={ btnTheme.primary }
                     isIconRight={ true }
                     size={ btnSize.medium }
                     iconName='ExportCSVM'
                     onClick={ () => exportQuizCsv() }
                  />
               </div>
            )}
            {selectedPage === 'settings' && (
               <div>
                  <BaseButton
                     text='Save Quiz'
                     theme={ btnTheme.primary }
                     size={ btnSize.medium }
                     onClick={ handleSaveQuiz }
                  />
               </div>
            )}

         </div>

         <Tabs
            variants={ tabsSelector }
            selectedVariant={ selectedPage }
            isButton={ false }
            isFullWidth={ false }
            hasIcon={ true }
            onSelect={ (value) => handleSelectTab(value) }
         />

         {selectedPage === 'results' && (
            <Results
               quiz={ quiz.data }
               isMobile={ isMobile }
               { ...res }
            />
         )}
         { selectedPage === 'settings' && (
            <Settings
               quizSettings={ quizSettings }
               onQuizSettingsChange={ onQuizSettingsChange }
               errorMessages={ errorMessages }
            />
         )}
      </div>
   );
};

Quiz.defaultProps = {
   quiz: {},
   quizSettings: {},
};

Quiz.propTypes = {
   quiz: PropTypes.object,
   handleSelectTab: PropTypes.func,
   goBack: PropTypes.func,
   handlePaginationChange: PropTypes.func,
   loading: PropTypes.bool,
   selectedPage: PropTypes.string,
   quizSettings: PropTypes.object,
   onQuizSettingsChange: PropTypes.func,
   handleSaveQuiz: PropTypes.func,
   exportQuizCsv: PropTypes.func,
   isMobile: PropTypes.bool,
   errorMessages: PropTypes.object,
};

export default Quiz;
