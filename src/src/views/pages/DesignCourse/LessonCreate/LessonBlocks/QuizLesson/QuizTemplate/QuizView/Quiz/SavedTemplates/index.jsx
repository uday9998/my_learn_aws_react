import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import moment from 'moment';

const SavedTemplates = ({
   quizTemplatesAsc, quizTemplatesDesc, chooseSavedTemplate,
}) => {
   const [isDesc, setIsDesc] = useState(false);
   let quizTemplates = quizTemplatesAsc;
   if (isDesc) {
      quizTemplates = quizTemplatesDesc;
   }
   return (
      <div className='savedTemplates'>
         <div className='savedTemplates_header'>
            <div>
               <Text
                  inner='Quiz Name'
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
            </div>
            <div>
               <Text
                  inner='Questions'
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
            </div>
            <div className='arrow_button'>
               <TextWithIcon
                  iconName={ isDesc ? 'ArrowButtonDescS' : 'ArrowButtonS' }
                  type={ types.mediumLarge }
                  isIconRight={ false }
                  inner='Updated At'
                  size={ sizes.small }
                  onClick={ () => setIsDesc(!isDesc) }
               />
            </div>
         </div>
         <div className='savedTemplates_content'>

            {quizTemplates.map(temp => {
               return (
                  <div className='savedTemplates_content_item' key={ temp.id }>
                     <div className='savedTemplates_content_item_name' onClick={ () => chooseSavedTemplate(temp.id) } role='presentation'>
                        <Text
                           inner={ temp.name }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                     <div>
                        <Text
                           inner={ temp.questions_count }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                     <div className='savedTemplates_content_time'>
                        <Text
                           inner={ moment(temp.created_at).format('MMMM DD, YYYY hh:mm A') }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                  </div>
               );
            })}

         </div>
      </div>
   );
};

SavedTemplates.propTypes = {
   quizTemplatesAsc: PropTypes.array,
   quizTemplatesDesc: PropTypes.array,
   chooseSavedTemplate: PropTypes.func,
};


export default SavedTemplates;
