/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CustomCodeText from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/CustomCodeText';
import './index.scss';

const Questionanswer = (props) => {
   const {
      slug, className, onClick, isPreview, justifyContent,
      subcomponent, primaryTheme, handleDuplicateComponent,
      handleDeleteComponent, sectionIndex, index,
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
            'customcode_section_content': !active || isPreview,
            'customcode_section_content mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         //  onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseOver={ (e) => toggle(e, 'enter') }
         onMouseOut={ (e) => toggle(e, 'leave') }
         style={ { justifyContent } }
      >

         <div className='customcode'>
            <CustomCodeText
               { ...subcomponent[0].props }
               slug={ subcomponent[0].slug }
               onClick={ (e) => onClick(e) }
               isPreview={ isPreview }
               subIndex={ 0 }
               style={ { fontFamily: primaryTheme } }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
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
   justifyContent: PropTypes.string,
   primaryTheme: PropTypes.string,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
};

export default Questionanswer;
