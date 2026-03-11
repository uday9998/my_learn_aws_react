/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import LinkView from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Link';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Links = (props) => {
   const {
      slug, onClick, subcomponent, isPreview, index, style,
      props: {
         paddingTop, paddingRight, paddingLeft, paddingBottom,
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
            'links': !active || isPreview,
            'links mark': active && !isPreview,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         data-index={ index }
         id={ slug }
         onMouseEnter={ toggle }
         onMouseLeave={ toggle }
         style={ {
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
         } }
      >
         <div className='links-content'>
            {!!subcomponent.length
               && subcomponent.map((link, i) => {
                  if (link.props.hasVisibility && link.props.visibility) {
                     return (
                        <LinkView
                           key={ link.slug }
                           slug={ link.slug }
                           link={ link.props }
                           index={ i }
                           onClick={ (e) => onClick(e) }
                           isPreview={ isPreview }
                           style={ style }
                        />
                     );
                  }
                  return null;
               }
               )}
         </div>
      </div>
   );
};

Links.defaultProps = {

};


Links.propTypes = {
   slug: PropTypes.string,
   subcomponent: PropTypes.array,
   isPreview: PropTypes.bool,
   onClick: PropTypes.func,
   index: PropTypes.number,
   props: PropTypes.object,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   style: PropTypes.object,
};


export default Links;
