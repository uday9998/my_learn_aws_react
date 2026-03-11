/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Bullet from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Bullet';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InlineActions from 'components/modules/InlineActions';
import './index.scss';

const Bullets = (props) => {
   const {
      slug, onClick, subcomponent, isPreview, bulletIconName, type, index, style,
      handleDuplicateComponent, changeProp,
      handleDeleteComponent, sectionIndex,
      props: {
         paddingTop, paddingRight, paddingLeft, paddingBottom, justifyContent,
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
            'bullets': !active || isPreview,
            'bullets mark': active && !isPreview,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         data-index={ index }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ {
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
            justifyContent,
         } }
      >
         <div className={ `bullets-content-${ type }` }>
            {!!subcomponent.length
               && subcomponent.map((bullet, i) => {
                  return (
                     <Bullet
                        key={ bullet.slug }
                        slug={ bullet.slug }
                        bullet={ bullet.props }
                        subIndex={ i }
                        onClick={ (e) => onClick(e) }
                        isPreview={ isPreview }
                        bulletIconName={ bulletIconName }
                        style={ style }
                        sectionIndex={ sectionIndex }
                        index={ index }
                        changeProp={ changeProp }
                     />
                  );
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

Bullets.defaultProps = {
   bulletIconName: 'BulletCheck',
   type: '1',
   justifyContent: 'center',
};


Bullets.propTypes = {
   slug: PropTypes.string,
   subcomponent: PropTypes.array,
   isPreview: PropTypes.bool,
   onClick: PropTypes.func,
   bulletIconName: PropTypes.string,
   type: PropTypes.string,
   index: PropTypes.number,
   props: PropTypes.object,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   justifyContent: PropTypes.string,
   style: PropTypes.object,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   changeProp: PropTypes.func,
};


export default Bullets;
