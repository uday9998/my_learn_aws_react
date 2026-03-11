/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Timer from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/Timer';
import InlineActions from 'components/modules/InlineActions';
import './index.scss';

const Countdown = (props) => {
   const {
      slug, className, isPreview, handleDuplicateComponent,
      handleDeleteComponent, sectionIndex, index,
      props: { bgColor },
      subcomponent,
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
            'countdown_section_content': !active || isPreview,
            'countdown_section_content mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         // onlick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { backgroundColor: bgColor } }
      >
         <div className=''>
            <Timer
               date={ Math.max(parseInt(subcomponent[0].props.date, 10),
                  parseInt(subcomponent[1].props.date, 10),
                  parseInt(subcomponent[2].props.date, 10),
                  parseInt(subcomponent[3].props.date, 10)) }
               days={ subcomponent[0].props.number === '' || parseInt(subcomponent[0].props.number, 10) < 0 ? 0 : subcomponent[0].props.number }
               hours={ subcomponent[1].props.number === '' || parseInt(subcomponent[1].props.number, 10) < 0 ? 0 : subcomponent[1].props.number }
               minutes={ subcomponent[2].props.number === '' || parseInt(subcomponent[2].props.number, 10) < 0 ? 0 : subcomponent[2].props.number }
               seconds={ subcomponent[3].props.number === '' || parseInt(subcomponent[3].props.number, 10) < 0 ? 0 : subcomponent[3].props.number }
               landingComponents={ subcomponent }
               isPreview={ isPreview }
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

Countdown.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   // onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   bgColor: PropTypes.string,
   subcomponent: PropTypes.array,
   props: PropTypes.object,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
};

export default Countdown;
