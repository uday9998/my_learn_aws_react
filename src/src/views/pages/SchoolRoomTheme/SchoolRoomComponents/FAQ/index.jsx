/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import QuestionAnswer from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/QuestionAnswer';
import InlineActions from 'components/modules/InlineActions';
import './index.scss';

const Questionanswer = (props) => {
   const {
      slug, className, onClick, isPreview, justifyContent,
      subcomponent, primaryTheme, handleDuplicateComponent, handleDeleteComponent, sectionIndex, index,
      changeProp,
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
            'faq_section_content': !active || isPreview,
            'faq_section_content mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         //  onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { justifyContent } }
      >

         <div className='questionAnswer'>
            {!!subcomponent.length
               && subcomponent.map((questions, i) => {
                  if (questions.props.visibility) {
                     return (
                        <QuestionAnswer
                           key={ questions.slug }
                           slug={ questions.slug }
                           questions={ questions }
                           subIndex={ i }
                           onClick={ (e) => onClick(e) }
                           isPreview={ isPreview }
                           primaryTheme={ primaryTheme }
                           sectionIndex={ sectionIndex }
                           handleDuplicateComponent={ handleDuplicateComponent }
                           handleDeleteComponent={ handleDeleteComponent }
                           index={ index }
                           changeProp={ changeProp }
                        />

                     );
                  }
                  return null;
               }
               )}
         </div>
         <InlineActions
            slug={ slug }
            handleDuplicateComponent={ handleDuplicateComponent }
            handleDeleteComponent={ handleDeleteComponent }
            sectionIndex={ sectionIndex }
            index={ index }
         />
      </div>
   );
};

Questionanswer.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   subcomponent: PropTypes.array,
   primaryTheme: PropTypes.string,
   justifyContent: PropTypes.string,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
   changeProp: PropTypes.func,
};

export default Questionanswer;
