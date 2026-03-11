import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import './index.scss';


const LessonBlock = ({
   addBlock, course,
}) => {
   let defaultBlocks = [
      {
         name: 'Video',
         icon: 'videoM',
         value: 'Video',
      },
      {
         name: 'Text',
         icon: 'TextM',
         value: 'Text',
      },
      {
         name: 'Quiz',
         icon: 'QuizM',
         value: 'Quiz',
      },
      {
         name: 'Audio',
         icon: 'audioM',
         value: 'Audio',
      },
      {
         name: 'PDF',
         icon: 'pdfM',
         value: 'Pdf',
      },
      {
         name: 'PowerPoint',
         icon: 'PptM',
         value: 'Ppt',
      },
      {
         name: 'Multimedia',
         icon: 'multimediaM',
         value: 'Multimedia',
      },
      {
         name: 'Image',
         icon: 'ImageM',
         value: 'Image',
      },
      {
         name: 'Custom Code',
         icon: 'codeM',
         value: 'Code',
      },
   ];

   if (course.type === '1') {
      defaultBlocks = [
         {
            name: 'Video',
            icon: 'videoM',
            value: 'Video',
         },
      ];
   }
   return (
      <div className='lesson__blocks__content'>
         <div>
            {defaultBlocks.map(block => {
               return (
                  <div
                     className='lesson__blocks__type'
                     key={ block.value }
                     onClick={ () => addBlock(block.value) }
                     role='presentation'
                  >
                     <div>
                        <IconNew name={ block.icon } />
                     </div>
                     <div>
                        <Text
                           inner={ block.name }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

LessonBlock.propTypes = {
   course: PropTypes.object,
   addBlock: PropTypes.func,
};

export default LessonBlock;
