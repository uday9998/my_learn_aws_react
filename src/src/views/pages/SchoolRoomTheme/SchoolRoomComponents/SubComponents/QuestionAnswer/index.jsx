/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Question from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/Question';
import Answer from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/Answer';
import DynamicWrapper from './DynamicWrapper';
import './index.scss';

const Questionanswer = (props) => {
   const {
      slug, className, onClick, isPreview,
      justifyContent, primaryTheme, questions,
      handleDuplicateComponent, handleDeleteComponent,
      sectionIndex, index, changeProp, subIndex,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'question_section_content': !active || isPreview,
            'question_section_content mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         //  onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { justifyContent } }
      >
         <div className='questions'>
            <DynamicWrapper
               isOpen={ false }
               title={ (
                  <Question
                     { ...questions.subcomponent[0].props }
                     slug={ questions.subcomponent[0].slug }
                     onClick={ (e) => onClick(e) }
                     isPreview={ isPreview }
                     subIndex={ subIndex }
                     subofSubIndex={ 0 }
                     index={ index }
                     style={ { fontFamily: primaryTheme } }
                     sectionIndex={ sectionIndex }
                     handleDuplicateComponent={ handleDuplicateComponent }
                     handleDeleteComponent={ handleDeleteComponent }
                     changeProp={ changeProp }
                  />
               ) }
               style={ { backgroundColor: questions.props.bgColor } }
            >
               <Answer
                  { ...questions.subcomponent[1].props }
                  slug={ questions.subcomponent[1].slug }
                  onClick={ (e) => onClick(e) }
                  isPreview={ isPreview }
                  subIndex={ subIndex }
                  subofSubIndex={ 1 }
                  style={ { fontFamily: primaryTheme } }
                  sectionIndex={ sectionIndex }
                  index={ index }
                  handleDuplicateComponent={ handleDuplicateComponent }
                  handleDeleteComponent={ handleDeleteComponent }
                  changeProp={ changeProp }
               />
            </DynamicWrapper>
         </div>
      </div>
   );
};

Questionanswer.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   subcomponent: PropTypes.array,
   questions: PropTypes.object,
   primaryTheme: PropTypes.string,
   justifyContent: PropTypes.string,
   subIndex: PropTypes.number,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
   changeProp: PropTypes.func,
};

export default Questionanswer;
