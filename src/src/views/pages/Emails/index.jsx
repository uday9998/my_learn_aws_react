import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Results from 'views/pages/Quizzes/Quiz/Results';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Tabs from 'components/elements/tabs';
import Router from 'routes/router';
import { useHistory } from 'react-router';


const tabsSelector = [
   { value: 'single_emails', key: 'Broadcast Emails', iconName: 'ChartPieFilledM' },
   // { value: 'settings', key: 'Email Sequences', iconName: 'SectionSettingsTabM' },
];

const Emails = ({
   quiz, goBack, handleSelectTab, selectedPage, quizSettings, onQuizSettingsChange, handleSaveQuiz, ...res
}) => {
   const history = useHistory();
   const goToCreatePage = () => {
      history.push(`${ Router.route('ADMIN_EMAILS_CREATE').getCompiledPath() }`);
   };
   return (
      <div className='general__emails'>
         <Tabs
            variants={ tabsSelector }
            selectedVariant={ selectedPage }
            isButton={ false }
            isFullWidth={ false }
            hasIcon={ true }
            onSelect={ (value) => handleSelectTab(value) }
         />
         <div className='general__emails__empty'>
            <IconNew name='HandL' />
            <Text
               inner='Welcome to Broadcast Emails'
               type={ types.regularDefault }
               size={ sizes.small }
            />
            <Text
               inner='Create New Broadcast Email'
               type={ types.regularDefaultSmall }
               size={ sizes.size_28 }
            />
            <BaseButton
               text='New Broadcast Email'
               theme={ btnTheme.primary }
               size={ btnSize.large }
               onClick={ () => goToCreatePage() }
            />
         </div>
         {selectedPage === 'results' && (
            <Results
               quiz={ quiz.data }
               { ...res }
            />
         )}
      </div>
   );
};

Emails.defaultProps = {
   quiz: {},
   quizSettings: {},
};

Emails.propTypes = {
   quiz: PropTypes.object,
   handleSelectTab: PropTypes.func,
   goBack: PropTypes.func,
   handlePaginationChange: PropTypes.func,
   loading: PropTypes.bool,
   selectedPage: PropTypes.string,
   quizSettings: PropTypes.object,
   onQuizSettingsChange: PropTypes.func,
   handleSaveQuiz: PropTypes.func,
};

export default Emails;
