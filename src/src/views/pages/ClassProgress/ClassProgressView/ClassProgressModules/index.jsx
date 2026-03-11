import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import ProgressChart from 'components/modules/progressChart';
import Icon from 'components/elements/Icon';

const ClassProgressModules = ({ modulesCounts, completedModules, modules }) => {
   const [currentClass, setCurrentClass] = useState(0);

   return (
      <div className='class__progress__modules'>
         <div className='class__progress__modules__left'>
            <div className='class__progress__modules__header'>
               <div className='counts'>
                  <Text inner='Modules' type={ txtTypes.regular160 } size={ txtSizes.xlarge } />
                  <Text inner={ modulesCounts } type={ txtTypes.mediumSmall } size={ txtSizes.xsmall } />
               </div>
               <div className='completed'>
                  <Text inner='Completed' type={ txtTypes.regularDefaultSmallX } size={ txtSizes.small } />
                  <Text inner={ `${ completedModules }/${ modulesCounts }` } type={ txtTypes.regularDefaultSmallX } size={ txtSizes.small } />
               </div>
            </div>
            <div className='class__progress__modules__list'>
               {modules.map((module, index) => {
                  return (
                     <div className={ index === currentClass ? 'module module__active' : 'module' } key={ uniqueId() } onClick={ () => setCurrentClass(index) } role='presentation'>
                        <div className='left'>
                           <Icon name={ index === currentClass ? 'ModuleFolderOpen' : 'ModuleFolder' } />
                           <Text
                              inner={ module.course_name }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                        <div className='right'>
                           <Text inner={ `${ parseInt(module.progress_percentage, 10) }%` } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                           <ProgressChart type='progress' prsent={ parseInt(module.progress_percentage, 10) } />
                           <Icon name='RightArrow' />
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
         <div className='class__progress__modules__right'>
            <div className='class__progress__modules__header'>
               <div className='counts'>
                  <Text inner='Lessons' type={ txtTypes.regular160 } size={ txtSizes.xlarge } />
                  <Text
                     inner={ modules[currentClass].lessons_completed_count }
                     type={ txtTypes.mediumSmall }
                     size={ txtSizes.xsmall }
                  />
               </div>
               <div className='completed'>
                  <Text inner='Completed' type={ txtTypes.regularDefaultSmallX } size={ txtSizes.small } />
                  <Text inner={ `${ modules[currentClass].lessons_completed_count }/${ modules[currentClass].lessons_all_count }` } type={ txtTypes.regularDefaultSmallX } size={ txtSizes.small } />
               </div>
            </div>
            <div className='class__progress__modules__list'>
               {modules[currentClass].completed_lessons.map((lesson) => {
                  return (
                     <div className='module' key={ uniqueId() }>
                        <div className='left'>
                           <Icon name='LessonFolder' />
                           <Text inner={ lesson.name } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        </div>
                        {
                           lesson.completed && (
                              <div className='right__check'>
                                 <Icon name='GreenCheck' />
                              </div>
                           )
                        }
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

ClassProgressModules.propTypes = {
   modulesCounts: PropTypes.number,
   completedModules: PropTypes.number,
   modules: PropTypes.array,
};

export default ClassProgressModules;
