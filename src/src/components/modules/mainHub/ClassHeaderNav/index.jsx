import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

// You can import the TextWithIcon component if available
// import { TYPES as txtTypes, SIZES as txtSizes, TextWithIcon } from 'components/elements/TextNew';

const ClassHeaderNav = ({
   itemsList = [],
   onGoBack,
}) => {
   return (
      <div className='classHeader'>
         <div className="classHeader__exitButton" onClick={onGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
               <path d="M6.707 5.293a1 1 0 00-1.414 1.414L9.586 12l-4.293 4.293a1 1 0 101.414 1.414L12 13.414l4.293 4.293a1 1 0 001.414-1.414L13.414 12l4.293-4.293a1 1 0 00-1.414-1.414L12 10.586 7.707 6.293a1 1 0 00-1.414 0z" />
            </svg>
            <span>Exit Lesson Room</span>
         </div>
         
         <div className='classHeader__btns'>
            {Array.isArray(itemsList) && itemsList.map((item, index) => (
               <React.Fragment key={index}>
                  {item}
               </React.Fragment>
            ))}
         </div>
      </div>
   );
};

ClassHeaderNav.propTypes = {
   itemsList: PropTypes.array,
   onGoBack: PropTypes.func,
};

export default ClassHeaderNav;