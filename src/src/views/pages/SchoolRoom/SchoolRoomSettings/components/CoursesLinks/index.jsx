import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isLocalhost } from 'utils/Helpers';

import Text from 'components/elements/TextNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';

import './index.scss';

const CoursesLinks = ({
   link,
}) => {
   const [showCopy, setShowCopy] = useState(false);
   const apiUrl = isLocalhost() ? 'localhost:3000' : `https://${ window.location.host }`;

   const copyOnClick = (link) => {  
      setShowCopy(true);
      const tempInput = document.createElement('input');
      tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
      tempInput.value = `${ apiUrl }/${ link }`;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      setTimeout(() => {
         setShowCopy(false);
      }, 1000);
   };

   const handleVisitURL = (link) => {
      window.open(`${ apiUrl }/${ link }`, '_blank');
   };
   
   return (
      <div className='link__block__wrapper'>
         <Text 
            inner={ link.title }
            style={ {
               fontSize: '15px',
            } }
         />
         <div className='link__wrapper'>
            <div className='link__field__wrapper'>
               <Text 
                  inner={ `${ apiUrl }/${ link.link }` }
                  style={ {
                     color: ' #727978',
                     fontWeight: 400,
                     fontSize: '15px',
                  } }
               />
               <div className='copy__wrapper' role='presentation' onClick={ () => copyOnClick(link.link) }>
                  <IconNew name='CopyProgramM' />
                  <span className={ `${ showCopy ? 'active' : '' } copied` }>Copied</span>
               </div>
            </div>
            <BaseButton 
               text='Visit URL'
               theme={ themes.secondary }
               onClick={ () => handleVisitURL(link.link) }
            />
         </div>
      </div>
   );
};

CoursesLinks.propTypes = {
   link: PropTypes.string,
};

export default CoursesLinks;