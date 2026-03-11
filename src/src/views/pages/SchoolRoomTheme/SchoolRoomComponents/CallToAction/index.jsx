/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextView from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/Text';
import TextAreaView from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/TextArea';
import Button from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/Button';
import InlineActions from 'components/modules/InlineActions';
import './index.scss';

const CallToAction = (props) => {
   const {
      slug, className, onClick, isPreview,
      subcomponent, style, changeProp, index,
      handleDuplicateComponent, handleDeleteComponent, sectionIndex,
      props: {
         bgColor, paddingTop, paddingRight, paddingLeft, paddingBottom,
         justifyContent,
      },
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
            'calltoaction_content': !active || isPreview,
            'calltoaction_content mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         //  onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ {
            justifyContent,
            backgroundColor: bgColor,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
         } }
      >

         <div className='calltoaction'>
            <TextView
               { ...subcomponent[0].props }
               slug={ subcomponent[0].slug }
               onClick={ (e) => onClick(e) }
               isPreview={ isPreview }
               index={ index }
               subIndex={ 0 }
               changeProp={ changeProp }
               style={ style }
            />
            <TextAreaView
               { ...subcomponent[1].props }
               slug={ subcomponent[1].slug }
               onClick={ (e) => onClick(e) }
               isPreview={ isPreview }
               index={ index }
               subIndex={ 1 }
               changeProp={ changeProp }
               style={ style }
            />
            <Button
               { ...subcomponent[2].props }
               slug={ subcomponent[2].slug }
               onClick={ (e) => onClick(e) }
               isPreview={ isPreview }
               index={ index }
               subIndex={ 2 }
               style={ style }
            />
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

CallToAction.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   subcomponent: PropTypes.array,
   props: PropTypes.object,
   style: PropTypes.object,
   changeProp: PropTypes.func,
   index: PropTypes.number,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
};

export default CallToAction;
