/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Bullet from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Bullet';
import InlineActions from 'components/modules/InlineActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { checkLightOrDarkTextColor } from '../Text';
import './index.scss';

const Bullets = (props) => {
   const {
      slug, onClick, subcomponent, isPreview, bulletIconName, checkoutType, index, changeProp,
      handleDuplicateComponent, handleDeleteComponent, sectionIndex, pricings, sections, templateName,
      props: {
         paddingTop, paddingRight, paddingLeft, paddingBottom,
      },
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const titleSubcomponent = Array.isArray(subcomponent) && subcomponent.find(sub => sub.props.isTitle);

   document.body.style.setProperty('--bulletBorderColor', checkLightOrDarkTextColor(sections));
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
         } }
      >
         {
            Boolean(titleSubcomponent) && (
               <div className='bullets-title'>
                  <Bullet
                     key={ titleSubcomponent.slug }
                     slug={ titleSubcomponent.slug }
                     bullet={ titleSubcomponent.props }
                     index={ index }
                     subIndex={ 0 }
                     onClick={ (e) => onClick(e) }
                     isPreview={ isPreview }
                     bulletIconName={ bulletIconName }
                     changeProp={ changeProp }
                  />
               </div>
            )
         }
         <div className={ `bullets-content-${ checkoutType }` }>
            {!!subcomponent.length
               && subcomponent.map((bullet, i) => {
                  if (bullet.props.isTitle) return null;
                  return (
                     <Bullet
                        key={ bullet.slug }
                        slug={ bullet.slug }
                        bullet={ bullet.props }
                        index={ index }
                        subIndex={ i }
                        onClick={ (e) => onClick(e) }
                        isPreview={ isPreview }
                        bulletIconName={ bulletIconName }
                        changeProp={ changeProp }
                        sections={ sections }
                        templateName={ templateName }
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
};


Bullets.propTypes = {
   slug: PropTypes.string,
   subcomponent: PropTypes.array,
   isPreview: PropTypes.bool,
   onClick: PropTypes.func,
   bulletIconName: PropTypes.string,
   checkoutType: PropTypes.string,
   index: PropTypes.number,
   props: PropTypes.object,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   changeProp: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   pricings: PropTypes.array,
   sections: PropTypes.array,
   templateName: PropTypes.string,
};


export default Bullets;
