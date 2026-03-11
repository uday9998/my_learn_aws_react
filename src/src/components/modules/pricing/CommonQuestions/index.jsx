/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const CommonQuestions = ({ questions }) => {
   return (
      <ItemWrapper style={ { borderColor: '#cddaf1' } }>
         <div className='commonQuestions'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='Common Questions'
            />
            <div className='commonQuestions__list'>
               <div className='commonQuestions__left'>
                  { questions.map((item, i) => {
                     return (
                        i < questions.length / 2 && (
                           <div className='commonQuestion' key={ i }>
                              <Text
                                 type={ TextType.bold }
                                 size={ TextSize.medium }
                                 inner={ item.question }
                              />
                              <div className='m-t-exs' />
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ item.answer }
                              />
                           </div>
                        )
                     );
                  }) }
               </div>
               <div className='commonQuestions__right'>
                  { questions.map((item, i) => {
                     return (
                        i >= questions.length / 2 && (
                           <div className='commonQuestion' key={ i }>
                              <Text
                                 type={ TextType.bold }
                                 size={ TextSize.medium }
                                 inner={ item.question }
                              />
                              <div className='m-t-exs' />
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ item.answer }
                              />
                           </div>
                        )
                     );
                  }) }
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

CommonQuestions.propTypes = {
   questions: PropTypes.array,
};

CommonQuestions.defaultProps = {
   questions: [],
};

export default CommonQuestions;
