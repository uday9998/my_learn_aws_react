import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Tabs from 'components/elements/tabs';
import img1 from 'assets/images/Program/videoprogram.png';
import img2 from 'assets/images/Program/lesson-settings-image-2.png';
import LessonSettingsInformation from './LessonSettingsInformation';
import LessonSettingsInputs from './LessonSettingsInputs';

const LessonSettings = ({
   inputs, onChange, goToComments, course,
   selectedTab, setSelectedTab, user,
}) => {
   const tabVariants = [
      { value: 'information', key: course.type === '1' ? 'Video Information' : 'Lesson Information', iconName: 'ProductInformationFirstM' },
      { value: 'settings', key: course.type === '1' ? 'Video Settings' : 'Lesson Settings', iconName: 'SectionSettingsTabM' },
   ];
   return (
      <div className='lesson__settings'>
         <div className='lesson__settings__tabs'>
            <Tabs
               hasIcon={ true }
               isButton={ false }
               selectedVariant={ selectedTab }
               variants={ tabVariants }
               onSelect={ (name) => setSelectedTab(name) }
            />
         </div>
         <div className='lesson__settings__content'>
            <div className='lesson__settings__content__edit'>
               {selectedTab === 'information' ? (
                  <LessonSettingsInformation
                     inputs={ inputs }
                     author={ course.authors[0] || user }
                     onChange={ onChange }
                     course={ course }
                  />
               ) : (
                  <LessonSettingsInputs
                     course={ course }
                     goToComments={ goToComments }
                     inputs={ inputs }
                     onChange={ onChange }
                  />
               )}
            </div>
            <div className='lesson__settings__content__image'>
               <img src={ selectedTab === 'information' ? img1 : img2 } alt='' />
            </div>
         </div>
      </div>
   );
};

LessonSettings.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   course: PropTypes.object,
   goToComments: PropTypes.func,
   setSelectedTab: PropTypes.func,
   user: PropTypes.object,
   selectedTab: PropTypes.string,
};

export default LessonSettings;
